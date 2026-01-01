import { spawn, move, Mutex, SharedJsonBuffer } from 'multithreading';
import { colornames } from 'color-name-list';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { parseArgs } from 'node:util';
import path from 'path';
import nc from 'nearest-color';

import { colord, extend } from 'colord';
import cmykPlugin from 'colord/plugins/cmyk';
import labPlugin from 'colord/plugins/lab';
import a11yPlugin from 'colord/plugins/a11y';
import namesPlugin from 'colord/plugins/names';

extend([cmykPlugin, labPlugin, a11yPlugin, namesPlugin]);

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    // Actions
    colors: { type: 'boolean', short: 'c' },
    palettes: { type: 'boolean', short: 'p' },
    random: { type: 'boolean', short: 'r' },

    // Options
    format: { type: 'string', short: 'f', default: 'json' },
    count: { type: 'string', default: '1000' },
    pcount: { type: 'string', default: '500' },
    workers: { type: 'string', short: 'w', default: '4' },
    out: { type: 'string', short: 'o', default: 'src/data' },
  },
});

const CONFIG = {
  DO_COLORS: values.colors ?? false,
  DO_PALETTES: values.palettes ?? false,
  IS_RANDOM_SINGLE: values.random ?? false,
  OUTPUT_FORMAT: values.format?.toLowerCase() ?? 'json',

  TOTAL_COLORS: parseInt(values.count!),
  TOTAL_PALETTES: parseInt(values.pcount!),
  WORKER_THREADS: parseInt(values.workers!),
  OUTPUT_DIR: path.join(process.cwd(), values.out!),
} as const;

type ColorType = { name: string; hex: string };

type DetailedColorType = ColorType & {
  rgb: string;
  hsl: string;
  cmyk: string;
  lab: string;
  isDark: boolean;
  contrastWhite: number;
};

type PaletteType = ColorType[];
type DetailedPaletteType = DetailedColorType[];

const serializedColorNames = colornames.map(c => ({
  name: c.name,
  hex: c.hex.toLowerCase()
}));

// --- Helper: Formatter (Console Output - No Wrapper) ---
function formatOutput(data: DetailedColorType | DetailedPaletteType): string {
  const isPalette = Array.isArray(data);
  const fmt = CONFIG.OUTPUT_FORMAT;

  if (fmt === 'hex') {
    if (isPalette) return (data as DetailedPaletteType).map(c => c.hex).join(' ');
    return (data as DetailedColorType).hex;
  }

  if (fmt === 'name') {
    if (isPalette) return (data as DetailedPaletteType).map(c => c.name).join(', ');
    return (data as DetailedColorType).name;
  }

  if (fmt === 'pretty') {
    if (isPalette) {
      const palette = data as DetailedPaletteType;
      const blocks = palette.map((c, i) => {
        return `
  [${i + 1}] ${c.name} (${c.hex})
      RGB:  ${c.rgb}
      HSL:  ${c.hsl}
      CMYK: ${c.cmyk}
      Contrast (White): ${c.contrastWhite.toFixed(2)}:1`;
      });
      return `\n🎨 Random Palette Generated\n========================================${blocks.join('\n-------------------------------------------------')}\n=====================================================`;
    }

    const c = data as DetailedColorType;
    return `
🎨 Color Analysis
=====================================================
  Name:  ${c.name}
  Hex:   ${c.hex}
-----------------------------------------------------
  RGB:   ${c.rgb}
  HSL:   ${c.hsl}
  CMYK:  ${c.cmyk}
  LAB:   ${c.lab}
-----------------------------------------------------
  Dark Mode: ${c.isDark ? 'Yes' : 'No'}
  Contrast (on White): ${c.contrastWhite.toFixed(2)}:1
====================================================`;
  }

  return JSON.stringify(data, null, 2);
}

function generateSingleColor(): DetailedColorType {
  const hex = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');

  const colorMap = colornames.reduce((acc, c) => {
    acc[c.name] = c.hex;
    return acc;
  }, {} as Record<string, string>);

  const nearest = nc.from(colorMap);
  const match = nearest(hex);
  const c = colord(hex);

  return {
    name: match?.name || 'Unknown',
    hex,
    rgb: c.toRgbString(),
    hsl: c.toHslString(),
    cmyk: c.toCmykString(),
    lab: `lab(${Math.round(c.toLab().l)}% ${Math.round(c.toLab().a)} ${Math.round(c.toLab().b)})`,
    isDark: c.isDark(),
    contrastWhite: c.contrast('#ffffff'),
  };
}

async function generateColorsBulk() {
  const countPerWorker = Math.ceil(CONFIG.TOTAL_COLORS / CONFIG.WORKER_THREADS);
  const progressMutex = new Mutex(new SharedJsonBuffer({ count: 0 }));

  const handles = Array.from({ length: CONFIG.WORKER_THREADS }, () => {
    return spawn(
      move(serializedColorNames, countPerWorker, progressMutex),
      async (namesData, targetCount, progress) => {
        const nc = await import('nearest-color');

        const colorMap = namesData.reduce((acc, c) => {
          acc[c.name] = c.hex;
          return acc;
        }, {} as Record<string, string>);

        const nearest = nc.default.from(colorMap);
        const results: ColorType[] = [];

        for (let j = 0; j < targetCount; j++) {
          const hex = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
          const match = nearest(hex);
          results.push({ name: match?.name || 'Unknown', hex });

          // Manual lock management
          if (j % 50 === 0) {
            const guard = await progress.lock();
            try {
              guard.value.count += 50;
            } finally {
              guard.dispose();
            }
          }
        }
        return results;
      }
    );
  });

  const interval = setInterval(async () => {
    try {
      const guard = await progressMutex.lock();
      try {
        process.stdout.write(`\rGenerating Colors... ${guard.value.count}/${CONFIG.TOTAL_COLORS}`);
      } finally {
        guard.dispose();
      }
    } catch (e) { /* ignore */ }
  }, 100);

  const results = await Promise.all(handles.map(h => h.join()));
  clearInterval(interval);

  return results.flatMap(r => (r.ok ? r.value : [])).slice(0, CONFIG.TOTAL_COLORS);
}

async function generatePalettesBulk(baseColors: ColorType[]) {
  const countPerWorker = Math.ceil(CONFIG.TOTAL_PALETTES / CONFIG.WORKER_THREADS);

  const handles = Array.from({ length: CONFIG.WORKER_THREADS }, () => {
    return spawn(
      move(baseColors, countPerWorker),
      async (colors, targetCount) => {
        const palettes: PaletteType[] = [];

        for (let i = 0; i < targetCount; i++) {
          const p: ColorType[] = [];
          for(let k=0; k<4; k++) {
             p.push(colors[Math.floor(Math.random() * colors.length)]);
          }
          palettes.push(p);
        }
        return palettes;
      }
    );
  });

  const results = await Promise.all(handles.map(h => h.join()));
  return results.flatMap(r => (r.ok ? r.value : [])).slice(0, CONFIG.TOTAL_PALETTES);
}

(async () => {
  try {
    if (CONFIG.IS_RANDOM_SINGLE) {
      if (CONFIG.DO_COLORS) {
        const color = generateSingleColor();
        console.log(formatOutput(color));
        process.exit(0);
      }
      if (CONFIG.DO_PALETTES) {
        const palette = Array.from({ length: 4 }, () => generateSingleColor());
        console.log(formatOutput(palette));
        process.exit(0);
      }
      console.error('❌ Error: -r must be used with -c or -p');
      process.exit(1);
    }

    // 2. Handle Help
    if (!CONFIG.DO_COLORS && !CONFIG.DO_PALETTES) {
      console.log(`
Usage: npx tsx scripts/generate-colors.ts [flags]

Actions:
  -c, --colors      Target Colors
  -p, --palettes    Target Palettes

Options:
  -r, --random      Output single random item to console
  -f, --format      Output format: [json, hex, name, pretty]

  --count <n>       Total colors to generate (default: 1000)
  --pcount <n>      Total palettes to generate (default: 500)
  -w, --workers <n> Number of worker threads
  -o, --out <path>  Output directory
      `);
      process.exit(0);
    }

    if (!existsSync(CONFIG.OUTPUT_DIR)) {
      mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });
    }

    let colors: ColorType[] = [];
    const colorsPath = path.join(CONFIG.OUTPUT_DIR, 'colors.json');

    if (CONFIG.DO_COLORS) {
      console.log(`🚀 Generating ${CONFIG.TOTAL_COLORS} colors...`);
      colors = await generateColorsBulk();

      writeFileSync(colorsPath, JSON.stringify({ data: colors }, null, 0));
      console.log(`\n✅ Saved to ${colorsPath}`);
    }
    else if (CONFIG.DO_PALETTES) {
      if (existsSync(colorsPath)) {
        console.log(`ℹ️  Loading existing colors from ${colorsPath}...`);
        const fileContent = JSON.parse(readFileSync(colorsPath, 'utf-8'));

        colors = Array.isArray(fileContent) ? fileContent : fileContent.data;
      } else {
        throw new Error('colors.json not found. Run with -c first.');
      }
    }

    if (CONFIG.DO_PALETTES) {
      if (!colors || colors.length === 0) throw new Error('No colors available.');

      console.log(`🚀 Generating ${CONFIG.TOTAL_PALETTES} palettes...`);
      const palettes = await generatePalettesBulk(colors);

      // WRAP FILE OUTPUT
      const palettesPath = path.join(CONFIG.OUTPUT_DIR, 'palettes.json');
      writeFileSync(palettesPath, JSON.stringify({ data: palettes }, null, 0));
      console.log(`✅ Saved to ${palettesPath}`);
    }

    process.exit(0);

  } catch (e) {
    console.error(`\n❌ Error: ${e instanceof Error ? e.message : e}`);
    process.exit(1);
  }
})();

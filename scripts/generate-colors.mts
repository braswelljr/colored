import { colornames } from 'color-name-list';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import nc from 'nearest-color';
import path from 'path';
// import { minify } from 'terser';

export type NamedColorType = {
  name: string;
  hex: string;
};

export type Palette = NamedColorType[];

// Configuration constants
export const CONFIG = {
  TOTAL_COLORS: 500,
  TOTAL_PALETTES: 225,
  MIN_COLORS_PER_PALETTE: 4,
  MAX_COLORS_PER_PALETTE: 4
} as const;

// Initialize nearest color lookup once
const nearest = nc.from(
  colornames.reduce<Record<string, string>>((acc, { name, hex }) => {
    acc[name] = hex;
    return acc;
  }, {})
);

// Cache for color lookups
const colorCache = new Map<string, NamedColorType>();

// Optimized: Use Set for faster hex lookups
const colorHexSet = new Set(colornames.map((c) => c.hex.toLowerCase()));

export function getColorName(hex: string): NamedColorType {
  if (!hex || typeof hex !== 'string') {
    throw new Error('Invalid hex color provided');
  }

  const normalized = hex.toLowerCase().replace(/^#/, '');

  // Validate hex format
  if (!/^[0-9a-f]{6}$/i.test(normalized)) {
    throw new Error('Invalid hex color format');
  }

  const fullHex = `#${normalized}`;

  if (colorCache.has(fullHex)) {
    return colorCache.get(fullHex)!;
  }

  // Optimized: Check Set first before array search
  const exact = colorHexSet.has(fullHex) ? colornames.find((c) => c.hex.toLowerCase() === fullHex) : null;

  const resolved = exact?.name ?? nearest(fullHex)?.name ?? 'Unknown';

  const result: NamedColorType = {
    name: resolved,
    hex: fullHex
  };

  colorCache.set(fullHex, result);
  return result;
}

export function generateRandomHexColor(): string {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
  );
}

export function generateColorList(count: number = CONFIG.TOTAL_COLORS): NamedColorType[] {
  if (count <= 0) {
    throw new Error('Count must be positive');
  }

  const seen = new Set<string>();
  const list: NamedColorType[] = [];
  let attempts = 0;
  const maxAttempts = count * 10; // Prevent infinite loops

  while (list.length < count && attempts < maxAttempts) {
    const hex = generateRandomHexColor();
    if (!seen.has(hex)) {
      seen.add(hex);
      list.push(getColorName(hex));
    }
    attempts++;
  }

  if (list.length < count) {
    console.warn(`Could only generate ${list.length} unique colors out of ${count} requested`);
  }

  return list;
}

// Optimized: More efficient object serialization
function toTsObject(data: unknown, indent: number = 2): string {
  if (data === null || data === undefined) return 'null';

  if (typeof data === 'string') {
    return `'${data.replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
  }

  if (typeof data === 'number' || typeof data === 'boolean') {
    return String(data);
  }

  if (data instanceof Date) {
    return `new Date('${data.toISOString()}')`;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) return '[]';
    const items = data.map((item) => ' '.repeat(indent) + toTsObject(item, indent + 2));
    return `[\n${items.join(',\n')}\n${' '.repeat(indent - 2)}]`;
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data);
    if (entries.length === 0) return '{}';
    const props = entries.map(([key, value]) => `${' '.repeat(indent)}${key}: ${toTsObject(value, indent + 2)}`);
    // return `{\n${props.join(',\n')}\n${' '.repeat(indent - 2)}}`;
    return `{ ${props.map((p) => p.trim()).join(', ')} }`;
  }

  return 'null';
}

export function generatePalettesFromColorList(
  colorList: NamedColorType[],
  total: number,
  minLen: number = CONFIG.MIN_COLORS_PER_PALETTE,
  maxLen: number = CONFIG.MAX_COLORS_PER_PALETTE
): Palette[] {
  if (!colorList || colorList.length === 0) {
    throw new Error('Color list cannot be empty');
  }
  if (total <= 0) {
    throw new Error('Total must be positive');
  }
  if (minLen <= 0 || maxLen <= 0 || minLen > maxLen) {
    throw new Error('Invalid palette length constraints');
  }

  const palettes: Palette[] = [];

  for (let i = 0; i < total; i++) {
    const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    const palette = new Set<NamedColorType>();
    let attempts = 0;
    const maxAttempts = length * 10;

    while (palette.size < length && attempts < maxAttempts) {
      const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
      palette.add(randomColor);
      attempts++;
    }

    palettes.push([...palette]);
  }

  return palettes;
}

// Improved error handling and parsing
function parseColorsFromFile(content: string): NamedColorType[] {
  try {
    const colorsMatch = content.match(/export const colors: NamedColorType\[\] = (\[[\s\S]*?\]);/);
    if (!colorsMatch) return [];

    // Use safer parsing method
    return Function(`"use strict"; return (${colorsMatch[1]});`)();
  } catch (error) {
    console.warn('Failed to parse existing colors:', error);
    return [];
  }
}

export async function generateColorsFile({
  relativeOutputPath = '/src/data/colors.ts',
  minifyOutput: _ = false,
  createMinifiedCopy: __ = false,
  reuseExisting = false
}: {
  relativeOutputPath?: string;
  reuseExisting?: boolean;
  minifyOutput?: boolean;
  createMinifiedCopy?: boolean;
} = {}): Promise<void> {
  const outputPath = path.join(process.cwd(), relativeOutputPath);
  let colors: NamedColorType[] = [];

  // Try to reuse existing colors
  if (reuseExisting && existsSync(outputPath)) {
    try {
      const existingContent = readFileSync(outputPath, 'utf-8');
      const existingColors = parseColorsFromFile(existingContent);

      if (existingColors.length > 0) {
        console.log(`📄 Reusing ${existingColors.length} colors from ${relativeOutputPath}`);
        colors = existingColors;
      }
    } catch (error) {
      console.error('⚠️ Error reading existing file, will regenerate:', error);
    }
  }

  // Generate new colors if needed
  if (colors.length < 1) {
    console.log(`🎨 Generating ${CONFIG.TOTAL_COLORS} new colors...`);
    colors = generateColorList(CONFIG.TOTAL_COLORS);
  }

  console.log(`🎨 Generating ${CONFIG.TOTAL_PALETTES} new palettes...`);
  const palettes = generatePalettesFromColorList(colors, CONFIG.TOTAL_PALETTES, CONFIG.MIN_COLORS_PER_PALETTE, CONFIG.MAX_COLORS_PER_PALETTE);

  const tsContent = `export type NamedColorType = {
  name: string;
  hex: string;
};

export type Palette = NamedColorType[];

export const colors: NamedColorType[] = ${toTsObject(colors)};

export const palettes: Palette[] = ${toTsObject(palettes)};
`;

  writeFileSync(outputPath, tsContent, 'utf-8');
  console.log(`✅ Color file written to ${relativeOutputPath}`);

  // if (minifyOutput || createMinifiedCopy) {
  //   const minPath = outputPath.replace(/\.ts$/, '.min.ts');
  //   try {
  //     const minified = await minify(tsContent, {
  //       format: {
  //         comments: false,
  //         preamble: '// This file is generated. Do not edit manually.',
  //         ecma: 2020
  //       },
  //       compress: {
  //         defaults: true,
  //         unused: true
  //       },
  //       mangle: {
  //         keep_classnames: true,
  //         keep_fnames: true
  //       }
  //     });

  //     if (minified.code) {
  //       writeFileSync(minPath, minified.code, 'utf-8');
  //       console.log(`✅ Minified version created at ${minPath}`);

  //       // Replace original with minified if minifyOutput is true
  //       if (minifyOutput) {
  //         writeFileSync(outputPath, minified.code, 'utf-8');
  //         console.log(`🔄 Replaced original with minified version`);
  //       }
  //     } else {
  //       console.warn('⚠️ Terser returned empty code, skipping minification');
  //     }
  //   } catch (error) {
  //     console.error('⚠️ Error creating minified version:', error);
  //   }
  // }
}

// Update the call to be async
(async () => {
  try {
    await generateColorsFile({
      relativeOutputPath: '/src/data/colors.ts',
      minifyOutput: true // Set to false if you don't want minification
    });
  } catch (error) {
    console.error('⚠️ Error generating colors file:', error);
    process.exit(1);
  }
})();

import { colornames } from 'color-name-list';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import nc from 'nearest-color';
import path from 'path';

type NamedColorType = {
  name: string;
  hex: string;
};

export type Palette = NamedColorType[];

const TOTAL_COLORS = 1200;
const TOTAL_PALETTES = 200;
const MIN_COLORS_PER_PALETTE = 3;
const MAX_COLORS_PER_PALETTE = 6;

const nearest = nc.from(
  colornames.reduce<Record<string, string>>((acc, { name, hex }) => {
    acc[name] = hex;
    return acc;
  }, {})
);

const colorCache = new Map<string, NamedColorType>();

export function getColorName(hex: string): NamedColorType {
  const normalized = hex.toLowerCase();
  if (colorCache.has(normalized)) return colorCache.get(normalized)!;

  const exact = colornames.find((c) => c.hex.toLowerCase() === normalized);
  const resolved = exact?.name ?? nearest(hex)?.name ?? '';

  const result: NamedColorType = {
    name: resolved,
    hex: hex
  };

  colorCache.set(normalized, result);
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

export function generateColorList(count: number = TOTAL_COLORS): NamedColorType[] {
  const seen = new Set<string>();
  const list: NamedColorType[] = [];

  while (list.length < count) {
    const hex = generateRandomHexColor().toLowerCase();
    if (!seen.has(hex)) {
      seen.add(hex);
      list.push(getColorName(hex));
    }
  }

  return list;
}

export function generatePalettesFromColorList(colorList: NamedColorType[], total: number, minLen = 3, maxLen = 6): Palette[] {
  const palettes: Palette[] = [];
  const colorPool = [...colorList];

  for (let i = 0; i < total; i++) {
    const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    const palette = new Set<NamedColorType>();

    while (palette.size < length) {
      const randomColor = colorPool[Math.floor(Math.random() * colorPool.length)];
      palette.add(randomColor);
    }

    palettes.push([...palette]);
  }

  return palettes;
}

function parseArray<T>(input: string): T[] {
  return Function(`"use strict"; return (${input});`)();
}

function generateColorsFile(relativeOutputPath = 'src/data/colors.ts') {
  const outputPath = path.join(process.cwd(), relativeOutputPath);

  let colors: NamedColorType[] = [];

  if (existsSync(outputPath)) {
    try {
      const existingText = readFileSync(outputPath, 'utf-8');
      const colorsMatch = existingText.match(/export const colors: NamedColorType\[\] = (\[[\s\S]*?\]);/);

      if (colorsMatch) {
        const existingColors = parseArray<NamedColorType>(colorsMatch[1]);
        if (existingColors.length > 0) {
          console.log(`📄 Reusing ${existingColors.length} colors from ${relativeOutputPath}.`);
          colors = existingColors;
        }
      }
    } catch (err) {
      console.error('⚠️ Error reading existing file, will regenerate everything.', err);
    }
  }

  if (colors.length < 0) {
    console.log(`🎨 Generating ${TOTAL_COLORS} new colors...`);
    colors = generateColorList(TOTAL_COLORS);
  }

  console.log(`🎨 Generating ${TOTAL_PALETTES} new palettes to replace old ones...`);
  const palettes = generatePalettesFromColorList(colors, TOTAL_PALETTES, MIN_COLORS_PER_PALETTE, MAX_COLORS_PER_PALETTE);

  const tsContent = `// This file is generated. Do not edit manually.

    export type NamedColorType = {
      name: string
      hex: string
    }

    export type Palette = NamedColorType[]

    export const colors: NamedColorType[] = ${JSON.stringify(colors, null, 2)};

    export const palettes: Palette[] = ${JSON.stringify(palettes, null, 2)};
    `;

  // 5. Write the result to the file
  writeFileSync(outputPath, tsContent, 'utf-8');
  console.log(`✅ Color file written to ${relativeOutputPath}`);
}

generateColorsFile();

console.log([]);

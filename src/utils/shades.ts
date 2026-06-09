import { colord } from 'colord';

export type Shade = {
  name: ShadeStep;
  hex: string;
};

export type ShadeScale = Record<ShadeStep, Shade>;

// Tailwind-style shade steps from 50 to 950
const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 'primary'] as const;

export type ShadeStep = (typeof SHADE_STEPS)[number];

type HslColor = {
  h: number;
  s: number;
  l: number;
};

/**
 * Generates a Tailwind-style shade scale (50-950) from a base color.
 * The base color becomes the 500 shade.
 * Async function to support future async color operations.
 */
export async function generateShades(baseColor: string): Promise<ShadeScale> {
  const color = colord(baseColor);

  if (!color.isValid()) {
    throw new Error(`Invalid color: ${baseColor}`);
  }

  const hsl = color.toHsl();
  const shades: ShadeScale = {
    primary: { name: 'primary', hex: color.toHex() },
    '50': { name: 50, hex: adjustLightness(hsl, 0.95) },
    '100': { name: 100, hex: adjustLightness(hsl, 0.9) },
    '200': { name: 200, hex: adjustLightness(hsl, 0.8) },
    '300': { name: 300, hex: adjustLightness(hsl, 0.7) },
    '400': { name: 400, hex: adjustLightness(hsl, 0.6) },
    '500': { name: 500, hex: adjustLightness(hsl, 0.5) },
    '600': { name: 600, hex: adjustLightness(hsl, 0.4) },
    '700': { name: 700, hex: adjustLightness(hsl, 0.3) },
    '800': { name: 800, hex: adjustLightness(hsl, 0.2) },
    '900': { name: 900, hex: adjustLightness(hsl, 0.1) },
    '950': { name: 950, hex: adjustLightness(hsl, 0.05) }
  };

  return shades;
}

/**
 * Adjusts the lightness of an HSL color while preserving hue and saturation.
 */
function adjustLightness(hsl: HslColor, lightness: number): string {
  return colord({ h: hsl.h, s: hsl.s, l: lightness * 100 }).toHex();
}

/**
 * Returns all available shade steps.
 */
export function getShadeSteps(): readonly ShadeStep[] {
  return SHADE_STEPS;
}

/**
 * Validates if a shade step is valid.
 * Type predicate to narrow the type when used in type guards.
 */
export function isValidShadeStep(step: string | number): step is ShadeStep {
  return SHADE_STEPS.includes(Number(step) as ShadeStep);
}

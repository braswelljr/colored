import { RGB } from '~/types/color'
import seedrandom from 'seedrandom'

/**
 * generateRandomHexColorArray - generates random array of colors using time as a seed
 * @param {number} length - length of the array
 * @return {Array<string>}
 */
export function generateRandomHexColorArray(length = 5): Array<string> {
  return new Array(length).fill('').map(() => generateRandomHexColor())
}

/**
 * generateRandomHexColor - generates random array of colors using time as a seed
 * @return {string}
 */
export function generateRandomHexColor(): string {
  const seed = seedrandom()
  return (
    '#' +
    Math.floor(seed() * 16777215)
      .toString(16)
      .padStart(6, '0')
  )
}

/**
 * generateRandomRGBColor - generates random array of colors using time as a seed
 * @return {RGB}
 */
export function generateRandomRGBColor(): RGB {
  const seed = seedrandom()

  return { R: Math.floor(seed() * 256), G: Math.floor(seed() * 256), B: Math.floor(seed() * 256) }
}

/**
 * generateRandomRGBColorArray - generates random array of colors using time as a seed
 * @param {number} length - length of the array
 * @return {Array<RGB>}
 * @example
 * const colors = generateRandomRGBColorArray(5)
 * console.log(colors)
 * // [
 * //   { r: 0, g: 0, b: 0 },
 * //   { r: 0, g: 0, b: 0 },
 * //  ]
 */
export function generateRandomRGBColorArray(length = 5): Array<RGB> {
  return new Array(length).fill('').map(() => generateRandomRGBColor())
}

/**
 * IsValidRGB - checks if RGB is valid
 * @param {RGB} rgb - RGB color
 * @return {boolean}
 * @example
 * const isValid = IsValidRGB({ r: 0, g: 0, b: 0 })
 * console.log(isValid)
 * // true
 */
export function IsValidRGB(rgb: RGB): boolean {
  return rgb.R >= 0 && rgb.R <= 255 && rgb.G >= 0 && rgb.G <= 255 && rgb.B >= 0 && rgb.B <= 255
}

/**
 * ToHex - converts RGB to Hex
 * @param {number} c - RGB color
 * @return {string}
 */
export function ToHex(c: number): string {
  return c.toString(16).padStart(2, '0')
}

/**
 * convertRGBToHex - converts RGB to Hex
 * @param {RGB} rgb - RGB color
 * @return {string}
 * @example
 * const hex = convertRGBToHex({ r: 0, g: 0, b: 0 })
 * console.log(hex)
 * // #000000
 */
export function convertRGBToHex(rgb: RGB): string {
  if (!IsValidRGB(rgb)) {
    return ''
  }

  return `#${ToHex(rgb.R)}${rgb.G}${rgb.B}`
}

/**
 * convertHexToRGB - converts Hex to RGB
 * @param {string} hex - Hex color
 * @return {RGB}
 * @example
 * const rgb = convertHexToRGB('#000000')
 * console.log(rgb)
 * // { r: 0, g: 0, b: 0 }
 */
export function convertHexToRGB(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    return { R: 0, G: 0, B: 0 }
  }

  return {
    R: parseInt(result[1], 16),
    G: parseInt(result[2], 16),
    B: parseInt(result[3], 16)
  }
}

import { NearestName, RGB } from '~/types/color'
import cnl from 'color-name-list'
import nc from 'nearest-color'

/**
 * generateRandomHexColorArray - generates random array of colors using time as a seed
 * @param {number} length - length of the array
 * @return {Array<string>}
 */
export function generateRandomHexColorArray(length = 5): Array<string> {
  return Array.from<string>({ length })
    .map((color, _, self) => {
      color = generateRandomHexColor()
      if (!color || !self.includes(color)) return ''
      return color
    })
    .filter(color => !!color && color.length > 0 && color)
}

/**
 * generateRandomHexColor - generates random array of colors using time as a seed
 * @return {string}
 */
export function generateRandomHexColor(): string {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  )
}

/**
 * generateRandomRGBColor - generates random array of colors using time as a seed
 * @return {RGB}
 */
export function generateRandomRGBColor(): RGB {
  const seed = Math.random()

  return { R: Math.floor(seed * 256), G: Math.floor(seed * 256), B: Math.floor(seed * 256) }
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

/**
 * getColorName - get color names
 *
 * @param {string} color -
 * @returns {string}
 */
export function getColorName(color: string): { name: string; color: string } {
  const cn = cnl.find(c => c.hex === color)
  const colors = cnl.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {}) // map the colors to their names
  const nearest = nc.from(colors) // get the nearest color
  // get the name of the color or the nearest color or return the hex value
  const nearestname: NearestName = nearest(color)

  // get the name of the color or the nearest color or return the hex value
  return {
    name: cn ? cn.name : nearestname ? nearestname.name : undefined || color,
    color: cn ? cn.hex : nearestname ? nearestname.value : undefined || color
  }
}

/**
 * splitHexIntoShades - split hex into shades
 * @param {string} color - hex color
 * @param {number} step - number of shades
 * @return {Array<string>}
 * @example const shades = splitHexIntoShades('#000000', 5)
console.log(shades)
// ['#000000', '#1a1a1a', '#333333', '#4d4d4d', '#666666']
 */
export function splitHexIntoShade(color: string, step: number): string[] {
  const hex = color.replace('#', '')

  // Check if the hex color is valid
  if (!/^(?:[0-9A-Fa-f]{3}){1,2}$/.test(hex)) return []

  // Determine the number of digits for each RGB component based on the hex length
  const numDigits = hex.length / 3
  const stepSize = Math.floor(255 / step)

  // Trim any alpha values from the hex color
  const trimmedHex = hex.substring(0, numDigits * 3)

  const shades: string[] = []

  for (let i = 0; i < step; i++) {
    const r = Math.max(
      0,
      Math.min(255, Math.floor(parseInt(trimmedHex.substring(0, numDigits), 16) - i * stepSize))
    )
    const g = Math.max(
      0,
      Math.min(
        255,
        Math.floor(parseInt(trimmedHex.substring(numDigits, numDigits), 16) - i * stepSize)
      )
    )
    const b = Math.max(
      0,
      Math.min(
        255,
        Math.floor(parseInt(trimmedHex.substring(numDigits * 2, numDigits), 16) - i * stepSize)
      )
    )

    shades.push(
      `#${r.toString(16).padStart(numDigits, '0')}${g.toString(16).padStart(numDigits, '0')}${b
        .toString(16)
        .padStart(numDigits, '0')}`
    )
  }

  return shades
}

/**
 * invertHex - invert hex color
 * @param {string} color - hex color
 * @return {string}
 * @example const inverted = invertHex('#000000')
 * console.log(inverted)
 * // #ffffff
 */
export function invertHex(color: string): string {
  const hex = color.replace('#', '')
  // Check if the hex color is valid
  if (!/^(?:[0-9A-Fa-f]{3}){1,2}$/.test(hex)) return ''

  return `#${(Number(`0x1${hex.replace('#', '')}`) ^ 0xffffff).toString(16).substring(1)}`
}

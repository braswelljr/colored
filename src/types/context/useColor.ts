export type HEX = string

export type HEXA = string

export type RGB = [number, number, number]

export type RGBA = [number, number, number, number]

export type HSL = [number, number, number]

export type HSLA = [number, number, number, number]

export type COLOR = RGB | RGBA | HSL | HSLA | HEX | HEXA

export type ColorMode = 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hex' | 'hexa'

export type ColorContextI = {
  hexToRgb: (hex: HEX | HEX) => RGB | RGBA
  rgbToHex: (rgb: RGB | RGBA) => HEX | HEXA
  hslToHex: (hsl: HSL | HSLA) => HEX | HEXA
  hexToHsl: (hex: HEX | HEXA) => HSL | HSLA
  rgbToHsl: (rgb: RGB | RGBA) => HSL | HSLA
  hslToRgb: (hsl: HSL | HSLA) => RGB | RGBA
}

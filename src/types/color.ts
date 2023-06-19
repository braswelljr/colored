export type RGB = { R: number; G: number; B: number }

export type COLOR = {
  name: string
  hex: string
  rgb: RGB
}

export interface PalleteContextI {
  colors: Array<COLOR>
  palletes: Array<Array<COLOR>>
}

export interface PalleteProviderI {
  children: React.ReactNode
}

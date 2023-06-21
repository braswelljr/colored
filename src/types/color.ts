import { Dispatch, SetStateAction } from 'react'

export type RGB = { R: number; G: number; B: number }

export type COLOR = {
  name: string
  hex: string
  rgb?: RGB
}

export interface SwatchContextI {
  colors: Array<COLOR>
  palletes: Array<Array<COLOR>>
  swatchType: SwatchType
  setSwatchType: (type: SwatchType) => void
  searchQuery?: string
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>
}

export type SwatchType = 'pallete' | 'color'

export interface SwatchProviderI {
  children: React.ReactNode
}

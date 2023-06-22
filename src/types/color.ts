import { Dispatch, SetStateAction } from 'react'

export type RGB = { R: number; G: number; B: number }

export type COLOR = {
  name: string
  hex: string
  rgb?: RGB
}

export interface SwatchContextI {
  colors: {
    data: Array<COLOR>
    loading: boolean
    error?: string
  }
  palletes: {
    data: Array<Array<COLOR>>
    loading: boolean
    error?: string
  }
  swatchType: SwatchType
  setSwatchType: (type: SwatchType) => void
  searchQuery?: string
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>
}

export type SwatchType = 'pallete' | 'color'

export interface SwatchProviderI {
  children: React.ReactNode
}

export type NearestName =
  | {
      name: string
      value: string
      rgb: {
        r: number
        g: number
        b: number
      }
      distance: number
    }
  | undefined

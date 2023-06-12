import { createContext, ReactNode, useContext } from 'react'
import { ColorContextI, HEX, HSL, RGB } from '~/types/context/useColor'

export const ColorContext = createContext<ColorContextI>({
  hexToRgb: () => ({} as RGB),
  rgbToHex: () => ({} as HEX),
  hslToHex: () => ({} as HEX),
  hexToHsl: () => ({} as HSL),
  rgbToHsl: () => ({} as HSL),
  hslToRgb: () => ({} as RGB)
})

/**
 *  ColorProvider - React provider for color conversion
 * @param children - React children
 * @returns
 */
export function ColorProvider({ children }: { children: ReactNode }) {
  return <ColorContext.Provider value={{} as ColorContextI}>{children}</ColorContext.Provider>
}

/**
 * useColor - React hook for color conversion
 * @returns {ColorContextI}
 */
export default function useColor(): ColorContextI {
  return useContext(ColorContext)
}

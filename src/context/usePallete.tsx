'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { HiExclamation } from 'react-icons/hi'
import { COLOR, PalleteContextI, PalleteProviderI } from '~/types/color'
import colorNameList from 'color-name-list'
import { convertHexToRGB, convertRGBToHex, generateRandomHexColorArray } from '~/utils/color'

/**
 * PalleteContext - Context for color pallete
 */
export const PalleteContext = createContext<PalleteContextI>({
  colors: [],
  palletes: []
})

/**
 * PalleteProvider - Provider for color pallete
 * @typedef {PalleteProviderI}
 * @property {JSX.Element} children - children
 * @returns {JSX.Element} PalleteProvider
 */
export function PalleteProvider({ children }: PalleteProviderI): JSX.Element {
  const [colors, setColors] = useState<COLOR[]>([])
  const [palletes, setPalletes] = useState<COLOR[][]>([])

  // generate random colors
  const c = useMemo(() => generateRandomHexColorArray(100), [])

  // set colors on mount
  useEffect(() => {
    setColors(
      c.map(hex => {
        const rgb = convertHexToRGB(hex)
        const cn = colorNameList.find(c => c.hex === hex)
        const name = cn ? cn.name : hex

        return {
          name,
          rgb,
          hex
        }
      })
    )
  }, [c])

  // memoized value
  const memoedValue = useMemo(() => ({ colors, palletes }), [colors, palletes])

  return <PalleteContext.Provider value={memoedValue}>{children}</PalleteContext.Provider>
}

/**
 * usePallete - hook for color pallete
 * @returns {PalleteContextI} PalleteContext
 */
export default function usePallete(): PalleteContextI {
  return useContext(PalleteContext)
}

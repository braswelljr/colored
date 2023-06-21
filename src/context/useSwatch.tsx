'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { COLOR, SwatchContextI, SwatchProviderI, SwatchType } from '~/types/color'
import { generateRandomHexColorArray, getColorName } from '~/utils/color'

/**
 * PalleteContext - Context for color pallete
 */
export const SwatchContext = createContext<SwatchContextI>({
  colors: [],
  palletes: [],
  swatchType: 'color',
  setSwatchType: () => {},
  searchQuery: undefined,
  setSearchQuery: () => {}
})

/**
 * PalleteProvider - Provider for color pallete
 * @typedef {PalleteProviderI}
 * @property {JSX.Element} children - children
 * @returns {JSX.Element} PalleteProvider
 */
export function SwatchProvider({ children }: SwatchProviderI): JSX.Element {
  const len = 150
  const palleteLen = 3
  const [colors, setColors] = useState<COLOR[]>([])
  const [palletes, setPalletes] = useState<COLOR[][]>([])
  const [swatchType, setSwatchType] = useState<SwatchType>('color')
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)

  // generate random colors
  // const c = useMemo(() => {
  //   const hexs = generateRandomHexColorArray(len)
  //   const withNames = hexs.map(hex => {
  //     const name = getColorName(hex)
  //     return {
  //       name,
  //       hex
  //     }
  //   })

  //   return withNames
  // }, [])
  // generate random palletes
  // const p = useMemo(() => {
  //   const plts: Array<Array<COLOR>> = []

  //   for (let i = 0; i < len / 3; i++) {
  //     // get random colors
  //     const hexs = generateRandomHexColorArray(palleteLen)
  //     // map the colors to their names
  //     const withNames = hexs.map(hex => {
  //       const name = getColorName(hex)

  //       return {
  //         name,
  //         hex
  //       }
  //     })
  //     // get random colors
  //     plts.push(withNames)
  //   }

  //   return plts
  // }, [])

  // memoized value
  const memoedValue = useMemo(
    () => ({
      colors,
      palletes,
      swatchType,
      setSwatchType,
      searchQuery,
      setSearchQuery
    }),
    [colors, palletes, swatchType, searchQuery]
  )

  return <SwatchContext.Provider value={memoedValue}>{children}</SwatchContext.Provider>
}

/**
 * useSwatch - hook for color swatch
 * @returns {SwatchContextI} PalleteContext
 */
export default function useSwatch(): SwatchContextI {
  return useContext(SwatchContext)
}

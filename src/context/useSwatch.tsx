'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { SwatchContextI, SwatchProviderI, SwatchType } from '~/types/color'
import c from 'lib/colors.json'
import p from 'lib/palletes.json'

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
  const [swatchType, setSwatchType] = useState<SwatchType>('color')
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const colors = useMemo(() => c, [])
  const palletes = useMemo(() => p, [])

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

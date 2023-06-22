'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { COLOR, SwatchContextI, SwatchProviderI, SwatchType } from '~/types/color'
import useSWR from 'swr'

/**
 * PalleteContext - Context for color pallete
 */
export const SwatchContext = createContext<SwatchContextI>({
  colors: {
    data: [],
    loading: false,
    error: undefined
  },
  palletes: {
    data: [],
    loading: false,
    error: undefined
  },
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
  const total = 720
  const palleteLen = 3
  const [colors, setColors] = useState<COLOR[]>([])
  const [palletes, setPalletes] = useState<COLOR[][]>([])
  const [swatchType, setSwatchType] = useState<SwatchType>('color')
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)

  interface COLORS_RES {
    colors?: COLOR[]
  }
  const {
    data: cd,
    error: ce,
    isLoading: cl
  } = useSWR<COLORS_RES>(
    `/generate/colors/api?total=${total}`,
    (url: URL) => fetch(url).then(res => res.json()),
    { revalidateOnFocus: false }
  )

  interface PALLETES_RES {
    palletes?: COLOR[][]
  }
  const {
    data: pd,
    error: pe,
    isLoading: pl
  } = useSWR<PALLETES_RES>(
    `/generate/palletes/api?total=${50}&palleteLen=${palleteLen}`,
    (url: URL) => fetch(url).then(res => res.json()),
    { revalidateOnFocus: false }
  )

  useEffect(() => {
    if (cd && cd.colors) setColors(cd.colors)
  }, [cd])

  useEffect(() => {
    if (pd && pd.palletes) setPalletes(pd.palletes)
  }, [pd])

  // memoized value
  const memoedValue = useMemo(
    () => ({
      colors: { data: colors, loading: cl, error: ce },
      palletes: { data: palletes, loading: pl, error: pe },
      swatchType,
      setSwatchType,
      searchQuery,
      setSearchQuery
    }),
    [colors, cl, ce, palletes, pl, pe, swatchType, searchQuery]
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

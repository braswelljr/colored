import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { colours } from '../assets/colors'
import { matchSorter } from 'match-sorter'

const useStore = create(
  devtools(set => ({
    colors: colours,
    query: '',
    filter: undefined,
    search: (collection, query) =>
      set({
        query,
        filter: query
          ? matchSorter(collection, query, {
              threshold: matchSorter.rankings.WORD_STARTS_WITH,
              keys: [
                'hex',
                'name',
                item => `rgb(${item.rgb.r},${item.rgb.g}${item.rgb.b})`,
                item => `hsl(${item.hsl.h},${item.hsl.s}${item.hsl.l})`
              ]
            })
          : undefined
      }),
    // -> work on fetching theme
    theme: 'light',
    themeDark: () => set({ theme: 'dark' }),
    themeLight: () => set({ theme: 'light' }),
    format: 'hex',
    gen: {
      state: 'closed',
      name: '',
      color: {},
      saturation: [],
      lightness: []
    },
    openGen: (name, color, saturation, lightness) =>
      set(state => ({
        gen: (state.gen = {
          state: 'opened',
          name: name,
          color: color,
          saturation: saturation,
          lightness: lightness
        })
      })),
    closeGen: () =>
      set(state => ({
        gen: (state.gen = {
          state: 'closed',
          name: '',
          color: {},
          saturation: [],
          lightness: []
        })
      })),
    setRGB: () => set(state => ({ format: (state.format = 'rgb') })),
    setHSL: () => set(state => ({ format: (state.format = 'hsl') })),
    setHEX: () => set(state => ({ format: (state.format = 'hex') }))
  }))
)

export default useStore

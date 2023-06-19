import { COLOR } from '~/types/color'
import { matchSorter } from 'match-sorter'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ColorState = {
  colors?: Array<COLOR>
  searchColors: (colors: Array<COLOR>, search?: string) => void
}

const useColorStore = create<ColorState>()(
  devtools(set => ({
    colors: undefined,
    searchColors: (colors: Array<COLOR>, search?: string) => {
      return set(state => ({
        ...state,
        colors: search
          ? matchSorter(colors, search, {
              threshold: matchSorter.rankings.WORD_STARTS_WITH,
              keys: ['name', 'hex']
            })
          : undefined
      }))
    }
  }))
)

export default useColorStore

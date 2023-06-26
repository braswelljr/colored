import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { matchSorter } from 'match-sorter'
import { COLOR } from '~/types/color'

type PalleteState = {
  palletes?: Array<Array<COLOR>>
  searchPalletes: (palletes: Array<Array<COLOR>>, search?: string) => void
}

const usePallete = create<PalleteState>()(
  devtools(set => ({
    palletes: undefined,
    searchPalletes: (palletes: Array<Array<COLOR>>, search?: string) => {
      return set(state => ({
        ...state,
        palletes: search
          ? matchSorter(palletes, search, {
              threshold: matchSorter.rankings.WORD_STARTS_WITH,
              keys: ['*.name', '*.hex']
            })
          : undefined
      }))
    }
  }))
)

export default usePallete

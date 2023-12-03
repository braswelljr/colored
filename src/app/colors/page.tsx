'use client'

import { useSearchParams } from 'next/navigation'
import { matchSorter } from 'match-sorter'
import Color from '~/components/Color'
import useSwatch from '~/context/useSwatch'

export default function Home() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const { colors } = useSwatch()

  const filteredColors = matchSorter(colors, q, {
    keys: ['name', 'hex', 'rgb']
  })

  return (
    <main className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
      {filteredColors && filteredColors.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-8 text-xs leading-4">
          {filteredColors.map((color, i) => (
            <Color key={i} color={color} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[50vh] w-full items-center justify-center">
          <div className="mx-auto mb-3 max-w-xl text-center text-lg font-medium leading-6 text-zinc-500">
            <p>
              Sorry! There are no colors for “{q}” 😥 make sure the code you entered matches a valid
              hex color code or a color name. Example “#000000” or “blue”.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}

'use client'

import { useSearchParams } from 'next/navigation'
import { matchSorter } from 'match-sorter'
import Pallete from '~/components/Pallete'
import useSwatch from '~/context/useSwatch'

export default function Home() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const { palletes } = useSwatch()

  // Use matchSorter to filter the inner array based on the query
  // Return the pallete if there are any matching colors
  const filteredPalletes = palletes.filter(
    pallete => matchSorter(pallete, q, { keys: ['name', 'hex', 'rgb'] }).length
  )

  return (
    <main className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
      {filteredPalletes && filteredPalletes.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 text-xs leading-4">
          {filteredPalletes.map((pallete, i) => (
            <Pallete key={i} pallete={pallete} />
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

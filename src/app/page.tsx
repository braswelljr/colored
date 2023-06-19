'use client'

import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { HiCode, HiColorSwatch, HiHashtag } from 'react-icons/hi'
import useColorStore from '~/store/colors'
import { shallow } from 'zustand/shallow'
import Search from '~/components/Search'
import usePallete from '~/context/usePallete'
import { circuit } from '~/utils/backgrounds'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const { colors: COLORS } = usePallete()
  const [colors, searchColors] = useColorStore(state => [state.colors, state.searchColors], shallow)

  return (
    <main className="">
      {/* header */}
      <section
        style={{ backgroundImage: circuit }}
        className="min-h-[20vh] bg-yellow-500 px-3 py-4 dark:bg-zinc-950 md:px-12 lg:px-20 xl:px-28"
      >
        <div className="mx-auto space-y-10">
          {/* heading */}
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="">
              <p className="text-xl font-medium uppercase xsm:text-2xl">
                Experience a world of personalized design with an array of handpicked colors at your
                disposal.
              </p>
            </div>
            <div className="">
              {/* github */}
              <a
                href="https://github.com/braswelljr/colored"
                target="_blank"
                rel="noopener noreferer"
                className="inline-flex w-full items-center justify-center space-x-4 rounded border border-zinc-950 bg-zinc-950/10 py-1.5 font-black transition-transform hover:translate-y-0.5 focus:translate-y-0.5 dark:border-yellow-500 dark:bg-yellow-500/10 dark:text-yellow-500"
              >
                <FaGithub className="h-5 w-auto" />
                <span className="text-lg">GitHub</span>
              </a>
            </div>
          </div>
          {/* options */}
          <div className="grid w-full grid-cols-2 items-center justify-center justify-items-center gap-4 pb-4 text-xs font-semibold md:grid-cols-3">
            {[
              {
                description: 'Generate a Colors',
                icon: HiHashtag
              },
              {
                description: 'Different Formats',
                icon: HiCode
              },
              {
                description: 'Curated Swatch',
                icon: HiColorSwatch
              }
            ].map((desc, i) => (
              <div key={i} className="flex items-start space-x-1 tracking-tight">
                <desc.icon className="h-5 w-auto" />
                <span className="text-xs uppercase xsm:text-sm">{desc.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* search area */}
      <div className="">
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="bg-yellow-100  px-3 py-4 dark:bg-zinc-900 md:px-12 lg:px-20 xl:px-28"
        />
      </div>
    </main>
  )
}

'use client'

import { FaGithub } from 'react-icons/fa'
import { HiArrowUp, HiCode, HiColorSwatch, HiHashtag } from 'react-icons/hi'
import { SwatchType } from '~/types/color'
import { AnimatePresence, motion } from 'framer-motion'
import { invertHex } from 'lib/color'
import useTop from '~/hooks/useTop'
import Search from '~/components/Search'
import Spinner from '~/components/Spinner'
import useSwatch from '~/context/useSwatch'
import { circuit } from '~/utils/backgrounds'
import { classNames } from '~/utils/className'

export default function Home() {
  const top = useTop()
  const { colors, palletes, searchQuery, setSearchQuery, swatchType, setSwatchType } = useSwatch()

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
                description: `${colors.length} Colors`,
                icon: HiHashtag
              },
              {
                description: `${palletes.length} Curated Swatches`,
                icon: HiColorSwatch
              },
              {
                description: 'Convert Formats',
                icon: HiCode
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
      <section className="sticky inset-x-0 top-0 z-10">
        {/* search area */}
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="bg-yellow-100 px-3 py-4 dark:bg-zinc-800 md:px-12 lg:px-20 xl:px-28"
        />
        {/* swatch switch */}
        <div className="flex min-h-[7vh] justify-between bg-yellow-200 px-3 py-2 dark:bg-zinc-900 md:px-12 lg:px-20 xl:px-28">
          <div className="flex items-center justify-center space-x-4">
            {['color', 'pallete'].map((type, i, self) => (
              <button
                key={i}
                type="button"
                className={classNames(
                  'relative px-2 py-1 text-xs font-bold uppercase focus:outline-none sm:text-sm',
                  swatchType === type && 'dark:text-zinc-950'
                )}
                onClick={() => setSwatchType(type as SwatchType)}
              >
                <AnimatePresence>
                  {swatchType === type && (
                    <motion.span
                      layoutId="--swatch-switch-indicator--"
                      className={classNames('absolute inset-0 bg-yellow-500', {
                        'rounded-l-md': i === 0,
                        'rounded-r-md': i === self.length - 1
                      })}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-[1]">{type}</span>
              </button>
            ))}
          </div>
          {/* top */}
          <div className="flex flex-col justify-center">
            <button
              type="button"
              className={classNames(
                'group/top relative cursor-pointer px-1 py-0.5 focus:outline-none',
                top <= 10 && 'opacity-100'
              )}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="relative inline-flex items-center space-x-2">
                <HiArrowUp className="h-3 w-auto" />
                <span>Scroll to top</span>
              </div>
              <span className="absolute inset-x-0 bottom-0 block h-[3px] w-0 rounded-md transition-width group-hover/top:w-full dark:bg-white" />
            </button>
          </div>
        </div>
      </section>
      {/* colors */}
      <section className="w-full px-3 py-4 pb-12 md:px-12 lg:px-20 xl:px-24">
        <div
          className={classNames('grid gap-8 text-xs leading-4', {
            'grid-cols-[repeat(auto-fill,minmax(132px,1fr))]':
              swatchType === 'color' && colors.length > 0,
            'grid-cols-[repeat(auto-fill,minmax(275px,1fr))]':
              swatchType === 'pallete' && palletes.length > 0
          })}
        >
          {swatchType === 'color' && colors.length > 0 ? (
            colors.map((color, i) => (
              <div
                key={i}
                style={{ backgroundColor: color.hex, color: invertHex(color.hex) }}
                className="relative flex h-24 cursor-pointer items-center justify-center rounded-md text-center font-semibold"
              >
                <span className="w-4/5 text-xs font-black uppercase sm:text-xsm">{color.name}</span>
              </div>
            ))
          ) : swatchType === 'pallete' && palletes.length > 0 ? (
            palletes.map((pallete, i) => (
              <div key={i} className="group/color grid h-64 cursor-pointer grid-rows-5 rounded-lg">
                {pallete.map((color, x) => (
                  <div
                    key={x}
                    style={{ backgroundColor: color.hex, color: invertHex(color.hex) }}
                    className={classNames('hover:h-16')}
                  >
                    <span className="w-4/5 text-xs font-black uppercase sm:text-xsm">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="flex min-h-[50vh] w-full items-center justify-center">
              <Spinner className="h-6 w-auto dark:text-yellow-200" />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

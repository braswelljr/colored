'use client';

import clsx from 'clsx';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';
import { FaGithub } from 'react-icons/fa';
import { HiArrowUp, HiCode, HiColorSwatch, HiDesktopComputer, HiHashtag, HiMoon, HiSun } from 'react-icons/hi';
import { Search } from '~/components/layout/search';
import { colors, palettes } from '~/data/colors';
import useTop from '~/hooks/use-top';
import { circuit } from '~/utils/backgrounds';
import { cn } from '~/utils/cn';

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const top = useTop();
  const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString.withDefault(''));

  return (
    <>
      <nav
        className={cn('w-full bg-yellow-500 dark:bg-zinc-950', className)}
        style={{ backgroundImage: circuit }}
      >
        <section className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 font-kablammo text-2xl font-extrabold uppercase dark:text-yellow-500"
            >
              <HiColorSwatch className="block h-6 w-auto" />
              <span className="uppercase">Colored</span>
            </Link>
            <LayoutGroup>
              <ul className={clsx('flex items-center justify-center space-x-2 max-lg:order-1')}>
                {Object.entries({
                  system: <HiDesktopComputer className={clsx('h-5 w-auto')} />,
                  dark: <HiMoon className={clsx('h-5 w-auto')} />,
                  light: <HiSun className={clsx('h-5 w-auto')} />
                }).map(([key, value], i, self) => (
                  <li
                    key={key}
                    className={clsx('relative block cursor-pointer p-1.5')}
                    onClick={() => setTheme(key)}
                  >
                    <AnimatePresence>
                      {key === theme && (
                        <motion.div
                          layoutId="themeIdPointer"
                          initial={false}
                          className={clsx(
                            'absolute inset-0 bg-neutral-800 dark:bg-yellow-500',
                            i === 0 && 'rounded-l-md',
                            i === self.length - 1 && 'rounded-r-md'
                          )}
                        />
                      )}
                    </AnimatePresence>
                    <span
                      className={clsx('relative z-[1] block h-full w-full', {
                        'text-yellow-500 dark:text-zinc-950': key === theme,
                        'dark:text-yellow-500': key !== theme
                      })}
                    >
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </LayoutGroup>
          </div>
          <div className="mx-auto mt-5 space-y-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_minmax(300px,400px)]">
              <div className="">
                <p className="text-xl font-medium uppercase xsm:text-2xl">
                  Experience a world of personalized design with an array of handpicked colors at your disposal.
                </p>
              </div>
              <div className="">
                <Link
                  href="https://github.com/braswelljr/colored"
                  target="_blank"
                  rel="noopener noreferer"
                  className="inline-flex w-full items-center justify-center space-x-4 rounded border border-zinc-950 bg-zinc-950/10 py-1.5 font-black transition-transform hover:translate-y-0.5 focus:translate-y-0.5 lg:max-w-xl dark:border-yellow-500 dark:bg-yellow-500/10 dark:text-yellow-500"
                >
                  <FaGithub className="h-5 w-auto" />
                  <span className="text-lg">GitHub</span>
                </Link>
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
                  description: `${palettes.length} Curated Swatches`,
                  icon: HiColorSwatch
                },
                {
                  description: 'Convert Formats',
                  icon: HiCode
                }
              ].map((desc, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-1 tracking-tight"
                >
                  <desc.icon className="h-5 w-auto" />
                  <span className="text-xs uppercase xsm:text-sm">{desc.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </nav>
      <section className="sticky inset-x-0 top-0 z-10">
        <Search
          query={searchQuery}
          onChangeQuery={setSearchQuery}
          className="bg-yellow-100 px-3 py-4 md:px-12 lg:px-20 xl:px-28 dark:bg-zinc-800"
          placeholder={`Search ${searchQuery && `"${searchQuery}"`}`}
        />
        {/* swatch switch */}
        <div className="-mt-1 flex min-h-[7vh] justify-between bg-yellow-200 px-3 py-2 md:px-12 lg:px-20 xl:px-28 dark:bg-zinc-900">
          <div className="flex items-center justify-center space-x-4">
            {[
              { page: 'Colors', path: '/' },
              { page: 'Palettes', path: '/palettes' }
            ].map((sw, i) => (
              <Link
                key={i}
                href={sw.path}
                className={cn(
                  'relative px-2 py-1 text-xs font-bold uppercase focus:outline-none sm:text-sm',
                  pathname === sw.path && 'dark:text-zinc-950'
                )}
              >
                <AnimatePresence>
                  {pathname === sw.path && (
                    <motion.div
                      layoutId="--swatch-switch-indicator--"
                      className={cn('absolute inset-0 h-full w-full bg-yellow-500')}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-[1]">{sw.page}</span>
              </Link>
            ))}
          </div>
          {/* top */}
          <div className="flex flex-col justify-center">
            <button
              type="button"
              className={cn('group/top relative cursor-pointer px-1 py-0.5 focus:outline-none', top <= 10 && 'opacity-100')}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="relative inline-flex items-center space-x-2">
                <HiArrowUp className="h-3 w-auto" />
                <span>Scroll to top</span>
              </div>
              <span className="absolute inset-x-0 bottom-0 block h-[3px] w-0 rounded-md bg-neutral-900 transition-[width] group-hocus/top:w-full dark:bg-white" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

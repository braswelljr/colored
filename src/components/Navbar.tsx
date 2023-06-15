'use client'

import Link from 'next/link'
import { HiColorSwatch, HiDesktopComputer, HiMoon, HiSun } from 'react-icons/hi'
import clsx from 'clsx'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { circuit } from '~/utils/backgrounds'
import { classNames } from '~/utils/className'

export default function Navbar({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <nav
      className={classNames(
        'w-full bg-yellow-500 px-3 py-4 dark:bg-zinc-950 md:px-12 lg:px-20 xl:px-28',
        className
      )}
      style={{ backgroundImage: circuit }}
    >
      <div className="flex items-center justify-between">
        {/* home link */}
        <Link
          href={'/'}
          className="inline-flex items-center space-x-2 font-serif text-2xl font-extrabold uppercase dark:text-yellow-500"
        >
          <HiColorSwatch className="block h-6 w-auto" />
          <span className="uppercase">Colored</span>
        </Link>
        {/* github */}
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
                        i === 0 && 'rounded-l-sm',
                        i === self.length - 1 && 'rounded-r-sm'
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
    </nav>
  )
}

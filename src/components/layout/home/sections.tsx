'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { parseAsString, useQueryState } from 'nuqs';
import { HiCode, HiColorSwatch, HiHashtag } from 'react-icons/hi';
import { HiArrowUp } from 'react-icons/hi2';
import { MdFavorite } from 'react-icons/md';
import { useWindowScroll } from 'react-use';
import { Swatch } from '~/components/colors/swatch';
import { Search } from '~/components/layout/search';
import { SegmentedControl, SegmentedControlList, SegmentedControlTrigger } from '~/components/ui/segmented-control';
import { colors, palettes } from '~/data/colors';
import { useFavoriteStore } from '~/store/use-favorite';
import { cn } from '~/utils/cn';

type SegmentProps = React.ComponentProps<'section'> & {};

export function Segment({ className, ...props }: SegmentProps) {
  const pathname = usePathname();
  const { y } = useWindowScroll();
  const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString.withDefault(''));
  const { state, onChangeState } = useFavoriteStore();

  return (
    <section
      {...props}
      className={cn('sticky inset-x-0 top-0 z-10 w-full', className)}
    >
      <div className="flex gap-2 bg-yellow-100/95 px-3 py-4 backdrop-blur-sm md:px-12 lg:px-20 xl:px-28 dark:bg-neutral-800/95">
        <Search
          query={searchQuery}
          onChangeQuery={setSearchQuery}
          className="w-full grow"
          placeholder={`Search ${searchQuery && `"${searchQuery}"`}`}
        />
        <Swatch className="" />
      </div>
      <div className="-mt-1 flex w-full justify-between gap-10 overflow-x-auto bg-yellow-200/90 px-3 py-2 whitespace-nowrap backdrop-blur md:px-12 lg:px-20 xl:px-28 dark:bg-neutral-900/90">
        <SegmentedControl
          value={pathname}
          className="flex shrink-0 items-center justify-center space-x-4"
        >
          <SegmentedControlList classNames={{ indicator: '!bg-yellow-500 !rounded' }}>
            {[
              { page: 'Colors', path: '/' },
              { page: 'Palettes', path: '/palettes' }
            ].map(({ page, path }) => (
              <SegmentedControlTrigger
                key={path}
                value={path}
                asChild
              >
                <Link
                  href={path}
                  className={cn(
                    'relative px-2 py-0.5 text-xs font-bold uppercase focus:outline-none sm:text-sm',
                    path === pathname ? '!text-neutral-950' : 'dark:!text-yellow-500'
                  )}
                >
                  {page}
                </Link>
              </SegmentedControlTrigger>
            ))}
          </SegmentedControlList>
        </SegmentedControl>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cn(
              'group/top relative cursor-pointer px-1 py-0.5 text-neutral-950 focus:outline-hidden focus:outline-none dark:text-yellow-500',
              y < 50 && 'opacity-0'
            )}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative inline-flex items-center space-x-2">
              <HiArrowUp className="size-3" />
              <span>Scroll to top</span>
            </div>
            <span className="absolute inset-x-0 bottom-0 block h-[3px] w-0 rounded-md bg-neutral-900 transition-[width] group-hocus/top:w-full dark:bg-yellow-500" />
          </button>

          <motion.button
            type="button"
            onClick={() => onChangeState((v) => !v)}
            className={cn('relative cursor-pointer focus:outline-hidden')}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.5 }}
            whileFocus={{ scale: 1.5 }}
          >
            <MdFavorite className={cn('size-6', state && 'text-red-500')} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

type HeaderProps = React.ComponentProps<'header'> & {};

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      {...props}
      className={cn('px-3 py-4 md:px-12 lg:px-20 xl:px-28', className)}
    >
      <div className="mx-auto mt-5 space-y-10">
        <div className="">
          <p className="text-center text-xl font-medium uppercase xsm:text-2xl dark:text-yellow-500">
            Experience a world of personalized design with an array of handpicked colors at your disposal.
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-around gap-x-6 gap-y-4 pb-4 text-xs font-semibold">
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
              className="flex shrink-0 items-center space-x-1 tracking-tight dark:text-yellow-500"
            >
              <desc.icon className="size-5" />
              <span className="text-xs uppercase xsm:text-sm">{desc.description}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { matchSorter } from 'match-sorter';
import { useShallow } from 'zustand/react/shallow';
import { Color } from '~/components/colors/color';
import { useFavoriteStore } from '~/store/use-favorite';
import type { ColorType } from '~/types/types';

type ColorGridProps = {
  initialColors: ColorType[];
};

export function ColorGrid({ initialColors = [] }: ColorGridProps) {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const { isFavorite, state } = useFavoriteStore(useShallow((s) => s));

  const filteredColors = useMemo(() => {
    let result = initialColors;

    if (state) {
      result = result.filter((v: any) => isFavorite(v.hex));
    }

    return matchSorter(result, q, { keys: ['name', 'hex'] });
  }, [q, initialColors, state, isFavorite]);

  return (
    <main className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
      {filteredColors && filteredColors.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-8 text-xs leading-4">
          {filteredColors.map((color: any, i: number) => (
            <Color
              key={i}
              colour={color}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[50vh] w-full items-center justify-center">
          <div className="mx-auto mb-3 max-w-xl text-center text-lg leading-6 font-medium text-zinc-500">
            <p>
              Sorry! There are no colors for “{q}” 😥 make sure the code you entered matches a valid hex color code or a
              color name. Example “#000000” or “blue”.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

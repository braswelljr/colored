'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { matchSorter } from 'match-sorter';
import { useShallow } from 'zustand/react/shallow';
import { Color } from '@/components/colors/color';
import { Skeleton } from '@/components/ui/skeleton';
import { useMediaQueries, useSkeletonCount } from '@/hooks/use-media-queries';
import { useColorsStore } from '@/store/use-colors';
import { useFavoriteStore } from '@/store/use-favorite';
import type { ColorType } from '@/types/types';

export default function Page() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const { onChangeColorsLen } = useColorsStore();
  const { isFavorite, state } = useFavoriteStore(
    useShallow((s) => ({ isFavorite: s.isFavorite, state: s.state }))
  );
  const { data: colors = [], isLoading } = useQuery<ColorType[]>({
    queryKey: ['colors'],
    queryFn: async () => fetch('/api/colors', { method: 'GET' }).then((res) => res.json())
  });

  useEffect(() => {
    if (Array.isArray(colors) && colors.length) onChangeColorsLen(colors.length);
  }, [colors, onChangeColorsLen]);

  const mediaQueries = useMediaQueries();
  const numberOfSketons = useSkeletonCount(mediaQueries);

  const filteredColors = useMemo(() => {
    let result = colors;

    if (state) {
      result = result.filter((color: ColorType) => isFavorite(color.hex));
    }

    return matchSorter(result, q, { keys: ['name', 'hex'] });
  }, [q, colors, state, isFavorite]);

  return (
    <main className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
      {filteredColors.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-8 text-xs leading-4">
          {filteredColors.map((color) => (
            <Color
              key={color.hex}
              colour={color}
            />
          ))}
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-8 text-xs leading-4">
          {Array.from({ length: numberOfSketons }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-24 w-full rounded-md"
              style={{ animationDelay: `${i + 1}00ms` }}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[50vh] w-full items-center justify-center">
          <div className="mx-auto mb-3 max-w-xl text-center text-lg leading-6 font-medium text-zinc-500">
            <p>
              Sorry! There are no colors for "{q}" 😥 make sure the code you entered matches a valid
              hex color code or a color name. Example "#000000" or "blue".
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

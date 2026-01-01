'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { matchSorter } from 'match-sorter';
import { useMedia } from 'react-use';
import { Palette } from '~/components/colors/palette';
import { Skeleton } from '~/components/ui/skeleton';
import { useColorsStore } from '~/store/use-colors';
import { PaletteType } from '~/types/types';

export default function Page() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const { onChangePaletteLen } = useColorsStore();
  const { data: palettes = [], isLoading } = useQuery<PaletteType[]>({
    queryKey: ['palettes'],
    queryFn: async () => fetch('/api/palettes', { method: 'GET' }).then((res) => res.json())
  });

  const isXs = useMedia('(max-width: 325px)');
  const isSm = useMedia('(max-width: 640px)');
  const isMd = useMedia('(max-width: 768px)');
  const isLg = useMedia('(max-width: 1024px)');
  const isXl = useMedia('(max-width: 1280px)');
  const is2xl = useMedia('(max-width: 1536px)');
  const is3xl = useMedia('(max-width: 1920px)');

  const numberOfSketons = useMemo(() => {
    if (isXs) return 3;
    if (isSm) return 6;
    if (isMd) return 10;
    if (isLg) return 14;
    if (isXl) return 18;
    if (is2xl) return 18;
    if (is3xl) return 24;
    return 20;
  }, [isXs, isSm, isMd, isLg, isXl, is2xl, is3xl]);

  useEffect(() => {
    if (Array.isArray(palettes) && palettes.length) onChangePaletteLen(palettes.length);
  }, [palettes]);

  const filteredPalletes = useMemo(
    () => palettes.filter((pallete) => matchSorter(pallete, q, { keys: ['name', 'hex', 'rgb'] }).length),
    [q, palettes]
  );

  return (
    <main className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
      {filteredPalletes && filteredPalletes.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 text-xs leading-4">
          {filteredPalletes.map((palette, i) => (
            <Palette
              key={i}
              palette={palette}
            />
          ))}
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 text-xs leading-4">
          {Array.from({ length: numberOfSketons }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-64 w-full rounded-md"
              style={{ animationDelay: `${i + 1}00ms` }}
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

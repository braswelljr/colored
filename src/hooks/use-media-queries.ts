import { useMemo } from 'react';
import { useMedia } from 'react-use';

export type MediaQueryBreakpoints = {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  is3xl: boolean;
};

export function useMediaQueries(): MediaQueryBreakpoints {
  const isXs = useMedia('(max-width: 325px)');
  const isSm = useMedia('(max-width: 640px)');
  const isMd = useMedia('(max-width: 768px)');
  const isLg = useMedia('(max-width: 1024px)');
  const isXl = useMedia('(max-width: 1280px)');
  const is2xl = useMedia('(max-width: 1536px)');
  const is3xl = useMedia('(max-width: 1920px)');

  return useMemo(
    () => ({ isXs, isSm, isMd, isLg, isXl, is2xl, is3xl }),
    [isXs, isSm, isMd, isLg, isXl, is2xl, is3xl]
  );
}

export function useSkeletonCount(mediaQueries: MediaQueryBreakpoints): number {
  const { isXs, isSm, isMd, isLg, isXl, is2xl, is3xl } = mediaQueries;

  return useMemo(() => {
    if (isXs) return 6;
    if (isSm) return 10;
    if (isMd) return 14;
    if (isLg) return 20;
    if (isXl) return 30;
    if (is2xl) return 30;
    if (is3xl) return 40;
    return 20;
  }, [isXs, isSm, isMd, isLg, isXl, is2xl, is3xl]);
}

export function usePaletteSkeletonCount(mediaQueries: MediaQueryBreakpoints): number {
  const { isXs, isSm, isMd, isLg, isXl, is2xl, is3xl } = mediaQueries;

  return useMemo(() => {
    if (isXs) return 3;
    if (isSm) return 6;
    if (isMd) return 10;
    if (isLg) return 14;
    if (isXl) return 18;
    if (is2xl) return 18;
    if (is3xl) return 24;
    return 20;
  }, [isXs, isSm, isMd, isLg, isXl, is2xl, is3xl]);
}

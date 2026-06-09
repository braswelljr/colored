'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { colord as cord } from 'colord';
import { HTMLMotionProps, motion } from 'motion/react';
import { parseAsString, useQueryState } from 'nuqs';
import { HiClipboard, HiExternalLink } from 'react-icons/hi';
import { MdFavorite } from 'react-icons/md';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { Card } from '@/components/ui/card';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useColorsStore } from '@/store/use-colors';
import { useFavoriteStore } from '@/store/use-favorite';
import { ColorType } from '@/types/types';
import { cn } from '@/utils/cn';

const MotionCard = motion.create(Card);

type ColorProps = HTMLMotionProps<'div'> & {
  colour: ColorType;
  className?: string;
};

export const Color = memo(
  ({ colour, className, onMouseOver, onMouseOut, ...props }: ColorProps) => {
    const { name, hex } = colour;
    const [favorited, setFavorited] = useState(false);
    const [mouse, setMouse] = useState(false);
    const [, _setColorQuery] = useQueryState('q', parseAsString.withDefault(''));
    const { isFavorite, toggleFavorite } = useFavoriteStore(
      useShallow((s) => ({ isFavorite: s.isFavorite, toggleFavorite: s.toggleFavorite }))
    );
    const { format, convertFormat } = useColorsStore(
      useShallow((s) => ({ format: s.format, convertFormat: s.convertFormat }))
    );

    const colorData = useMemo(() => {
      const formatted = convertFormat(hex, { format });
      return {
        color: formatted,
        inverted: cord(hex).invert().toHex(),
        dark: cord(hex).isDark()
      };
    }, [hex, format, convertFormat]);

    const { copyToClipboard, isCopied } = useCopyToClipboard({
      timeout: 1200,
      onCopy: () => {
        toast.success(
          <span
            style={{ '--colored-main-color': colorData.color } as React.CSSProperties}
            className="text-sm"
          >
            <span className="font-semibold text-(--colored-main-color)!">{colorData.color}</span>{' '}
            copied!
          </span>
        );
      }
    });

    const handleCopy = useCallback(() => {
      copyToClipboard(colorData.color);
    }, [colorData.color, copyToClipboard]);

    const handleMouseOver = useCallback(
      (e: React.MouseEvent) => {
        onMouseOver?.(e as any);
        setMouse(true);
      },
      [onMouseOver]
    );

    const handleMouseOut = useCallback(
      (e: React.MouseEvent) => {
        onMouseOut?.(e as any);
        setMouse(false);
      },
      [onMouseOut]
    );

    const handleFavoriteToggle = useCallback(() => {
      toggleFavorite(colour);
      setFavorited(true);
      setTimeout(() => setFavorited(false), 1200);
    }, [colour, toggleFavorite]);

    const showFeedback = isCopied || favorited;

    return (
      <MotionCard
        {...props}
        style={
          {
            '--colored-main-color': colorData.color,
            '--colored-inverted-color': colorData.inverted
          } as React.CSSProperties
        }
        className={cn(
          'group/color relative flex h-24 cursor-pointer items-center justify-center rounded-md text-center font-semibold',
          'bg-(--colored-main-color)!',
          colorData.dark ? 'text-white!' : 'text-neutral-950!',
          className
        )}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="flex w-4/5 flex-col gap-2">
          <span className="text-xs font-black uppercase sm:text-xsm">{name}</span>
          <span className="">{colorData.color}</span>
        </div>

        <motion.div
          className={cn(
            'absolute inset-0 z-1 grid place-content-center rounded bg-(--colored-main-color)/50 backdrop-blur-sm transition-opacity duration-300',
            mouse ? 'opacity-100' : 'opacity-0'
          )}
        >
          {showFeedback ? (
            <motion.span layoutId={favorited ? `favorite-${hex}` : hex}>
              {favorited ? (
                <MdFavorite className={cn('size-12', isFavorite(hex) && 'text-red-500')} />
              ) : (
                <span className="font-kablammo text-xl font-black uppercase">copied</span>
              )}
            </motion.span>
          ) : (
            <div className="absolute inset-0 flex size-full flex-col justify-between p-2">
              <div className="flex items-center justify-end">
                <motion.button
                  layoutId={`favorite-${hex}`}
                  type="button"
                  className="inline-flex size-6 items-center justify-center"
                  onClick={handleFavoriteToggle}
                >
                  <MdFavorite className={cn('size-5', isFavorite(hex) && 'text-red-500')} />
                </motion.button>
              </div>
              <div className="flex items-end justify-between">
                <Link
                  href={`/color?q=${encodeURIComponent(hex)}`}
                  className="inline-flex size-6 items-center justify-center rounded"
                >
                  <HiExternalLink className="size-5" />
                </Link>
                <motion.button
                  layoutId={hex}
                  type="button"
                  className={cn(
                    'inline-flex h-6 items-center space-x-1 rounded border px-1 py-0.5 text-sm',
                    'bg-(--colored-main-color)!',
                    colorData.dark ? 'border-white' : 'border-neutral-950'
                  )}
                  onClick={handleCopy}
                >
                  <HiClipboard className="size-3" />
                  <span className="text-sm font-bold uppercase">Copy</span>
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </MotionCard>
    );
  }
);

Color.displayName = 'Color';

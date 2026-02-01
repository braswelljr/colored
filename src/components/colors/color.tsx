'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { colord as cord } from 'colord';
import { HTMLMotionProps, motion } from 'motion/react';
import { parseAsString, useQueryState } from 'nuqs';
import { HiClipboard, HiExternalLink } from 'react-icons/hi';
import { MdFavorite } from 'react-icons/md';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { Card } from '~/components/ui/card';
import { useColorsStore } from '~/store/use-colors';
import { useFavoriteStore } from '~/store/use-favorite';
import { ColorType } from '~/types/types';
import { cn } from '~/utils/cn';
import copy from '~/utils/copy';

const MotionCard = motion.create(Card);

type ColorProps = HTMLMotionProps<'div'> & {
  colour: ColorType;
  className?: string;
};

export const Color = memo(({ colour, className, onMouseOver, onMouseOut, ...props }: ColorProps) => {
  const { name, hex } = colour;
  const [copied, setCopied] = useState<'favorite' | 'copied'>();
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
      inverted: cord(formatted).invert().toHex(),
      dark: cord(formatted).isDark()
    };
  }, [hex, format, convertFormat]);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(undefined), 1200);
    return () => clearTimeout(timeout);
  }, [copied]);

  const toastConfig = useMemo(
    () => ({
      loading: (
        <span
          style={{ '--colored-main-color': colorData.color } as React.CSSProperties}
          className="text-sm"
        >
          Copying <span className="font-semibold !text-(--colored-main-color)">{colorData.color}</span>...
        </span>
      ),
      success: () => {
        setCopied('copied');
        return {
          type: 'info',
          message: '',
          description: (
            <span
              style={{ '--colored-main-color': colorData.color } as React.CSSProperties}
              className="text-sm"
            >
              <span className="font-semibold !text-(--colored-main-color)">{colorData.color}</span> copied successfully!
            </span>
          )
        };
      },
      error: <span className="text-sm text-red-500">Failed to copy. Please try again.</span>
    }),
    [colorData.color]
  );

  const handleCopy = useCallback(() => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          copy(colorData.color).then(resolve).catch(reject);
        }, 500);
      }),
      toastConfig
    );
  }, [colorData.color, toastConfig]);

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
    setCopied('favorite');
  }, [colour, toggleFavorite]);

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
        '!bg-(--colored-main-color)',
        colorData.dark ? '!text-white' : '!text-neutral-950',
        className
      )}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="flex w-4/5 flex-col gap-2">
        <span className="sm:text-xsm text-xs font-black uppercase">{name}</span>
        <span className="">{colorData.color}</span>
      </div>

      <motion.div
        className={cn(
          'absolute inset-0 z-[1] grid place-content-center rounded bg-(--colored-main-color)/50 backdrop-blur-sm transition-opacity duration-300',
          mouse ? 'opacity-100' : 'opacity-0'
        )}
      >
        {copied ? (
          <motion.span layoutId={copied === 'favorite' ? `favorite-${hex}` : hex}>
            {copied === 'favorite' ? (
              <MdFavorite className={cn('size-12', isFavorite(hex) && 'text-red-500')} />
            ) : (
              <span className="font-kablammo text-xl font-black uppercase">{copied}</span>
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
                  '!bg-(--colored-main-color)',
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
});

Color.displayName = 'Color';

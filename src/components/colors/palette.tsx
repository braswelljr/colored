'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { colord as cord } from 'colord';
import { HTMLMotionProps, motion, MotionStyle } from 'motion/react';
import { HiClipboard } from 'react-icons/hi';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { Card } from '~/components/ui/card';
import { useColorsStore } from '~/store/use-colors';
import { ColorType, PaletteType } from '~/types/types';
import { cn } from '~/utils/cn';
import copy from '~/utils/copy';

const MotionCard = motion.create(Card);

type PaletteProps = HTMLMotionProps<'div'> & {
  palette: PaletteType;
  className?: string;
};

export const Palette = memo(({ palette, className, ...props }: PaletteProps) => {
  const [active, setActive] = useState<string | undefined>(undefined);

  const gridTemplate = useMemo(() => {
    const activeIndex = palette.findIndex((c) => c.hex === active);
    if (activeIndex === -1) {
      return `repeat(${palette.length ?? 1}, 1fr)`;
    }
    const parts = palette.map((_, idx) => (idx === activeIndex ? '3fr' : '1fr'));
    return parts.join(' ');
  }, [active, palette]);

  const handleMouseOver = useCallback((hex: string) => () => setActive(hex), []);

  const handleMouseOut = useCallback(() => setActive(undefined), []);

  return (
    <MotionCard
      data-slot="palette"
      {...props}
      className={cn(
        'group/palette grid h-80 grid-cols-1 gap-0 overflow-hidden rounded-lg !p-0 transition-[grid-template-rows,height]',
        className
      )}
      style={{ gridTemplateRows: gridTemplate, ...props.style } as MotionStyle}
    >
      {palette.map((color, i) => (
        <ColorPad
          key={`palette-color-${color.hex}-${i}`}
          colour={color}
          onMouseOver={handleMouseOver(color.hex)}
          onMouseOut={handleMouseOut}
          className="h-full transition-[height]"
        />
      ))}
    </MotionCard>
  );
});

Palette.displayName = 'Palette';

type ColorPadProps = HTMLMotionProps<'div'> & {
  colour: ColorType;
  className?: string;
};

const ColorPad = memo(({ colour, className, onMouseOver, onMouseOut, ...props }: ColorPadProps) => {
  const { name, hex } = colour;
  const { format, convertFormat } = useColorsStore(
    useShallow((s) => ({ format: s.format, convertFormat: s.convertFormat }))
  );

  const [copied, setCopied] = useState(false);
  const [mouse, setMouse] = useState(false);

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
    const timeout = setTimeout(() => setCopied(false), 1200);
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
        setCopied(true);
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

  return (
    <MotionCard
      data-slot="color-pad"
      {...props}
      style={
        {
          '--colored-main-color': colorData.color,
          '--colored-inverted-color': colorData.inverted,
          ...props.style
        } as MotionStyle
      }
      className={cn(
        'group/color relative flex h-auto cursor-pointer items-center justify-center rounded-none border-0 !p-0 text-center font-semibold',
        '!bg-(--colored-main-color)',
        colorData.dark ? '!text-white' : '!text-neutral-950',
        className
      )}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span className="sm:text-xsm flex w-4/5 flex-col gap-1 text-xs font-black uppercase">
        <span className="">{name}</span>
        <span>{colorData.color}</span>
      </span>

      <motion.div
        className={cn(
          'absolute inset-0 z-[1] grid place-content-center rounded bg-(--colored-main-color)/50 backdrop-blur-sm transition-opacity duration-300',
          mouse ? 'opacity-100' : 'opacity-0'
        )}
      >
        {copied ? (
          <motion.span layoutId={hex}>
            <span className="font-kablammo text-xl font-black uppercase">copied</span>
          </motion.span>
        ) : (
          <div className="flex size-full items-center justify-center">
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
        )}
      </motion.div>
    </MotionCard>
  );
});

ColorPad.displayName = 'ColorPad';

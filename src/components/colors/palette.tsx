'use client';

import { memo, useMemo, useState } from 'react';
import { colord as cord } from 'colord';
import { HTMLMotionProps, motion, MotionStyle } from 'motion/react';
import { Card } from '~/components/ui/card';
import { useColorsStore } from '~/store/use-colors';
import { ColorType, PaletteType } from '~/types/types';
import { cn } from '~/utils/cn';

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
      return `repeat(${palette.length ?? 1}, 1fr)`; // even heights
    }

    const parts = palette.map((_, idx) => (idx === activeIndex ? '3fr' : '1fr'));
    return parts.join(' ');
  }, [active, palette]);

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
          key={i}
          colour={color}
          onMouseOver={() => setActive(color?.hex)}
          onMouseOut={() => setActive(undefined)}
          className={cn('h-full transition-[height]')}
        />
      ))}
    </MotionCard>
  );
});
Palette.displayName = 'PalletePad';

type ColorPadProps = HTMLMotionProps<'div'> & {
  colour: ColorType;
  className?: string;
};

function ColorPad({ colour, className, ...props }: ColorPadProps) {
  const { name, hex } = colour;
  const { format, convertFormat } = useColorsStore();
  const color = convertFormat(hex, { format });

  const inverted = useMemo(() => cord(color).invert().toHex(), [color]);
  const dark = useMemo(() => cord(color).isDark(), [color]);

  return (
    <MotionCard
      data-slot="color-pad"
      {...props}
      style={{ '--colored-main-color': color, '--colored-inverted-color': inverted, ...props.style } as MotionStyle}
      className={cn(
        'group/color relative flex h-auto cursor-pointer items-center justify-center rounded-none border-0 !p-0 text-center font-semibold',
        '!bg-(--colored-main-color)', // !text-(--colored-inverted-color)
        dark ? '!text-white' : '!text-neutral-950',
        className
      )}
    >
      <span className="sm:text-xsm flex w-4/5 flex-col gap-1 text-xs font-black uppercase">
        <span className="">{name}</span>
        <span>{color}</span>
      </span>
    </MotionCard>
  );
}

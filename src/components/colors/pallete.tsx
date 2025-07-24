'use client';

import { colord as cord } from 'colord';
import { HTMLMotionProps, motion, MotionStyle } from 'motion/react';
import { useMemo, useState } from 'react';
import { Card } from '~/components/ui/card';
import { ColorType, PaletteType } from '~/data/colors';
import { cn } from '~/utils/cn';

const MotionCard = motion.create(Card);

type PaletteProps = HTMLMotionProps<'div'> & {
  palette: PaletteType;
  className?: string;
};

export default function Pallete({ palette, className, ...props }: PaletteProps) {
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
      className={cn('group/palette grid h-80 grid-cols-1 gap-0 overflow-hidden rounded-lg !p-0 transition-[grid-template-rows]', className)}
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
      {/* <CardFooter></CardFooter> */}
    </MotionCard>
  );
}

type ColorPadProps = HTMLMotionProps<'div'> & {
  colour: ColorType;
  className?: string;
};

function ColorPad({ colour, className, ...props }: ColorPadProps) {
  const { name, hex } = colour;
  const inverted = useMemo(() => cord(hex).invert().toHex(), [hex]);
  const dark = useMemo(() => cord(hex).isDark(), [hex]);

  return (
    <MotionCard
      data-slot="color-pad"
      {...props}
      style={{ '--colored-main-color': hex, '--colored-inverted-color': inverted, ...props.style } as MotionStyle}
      className={cn(
        'group/color relative flex h-15 cursor-pointer items-center justify-center rounded-none border-0 !p-0 text-center font-semibold',
        '!bg-(--colored-main-color)', // !text-(--colored-inverted-color)
        dark ? '!text-white' : '!text-neutral-950',
        className
      )}
    >
      <span className="w-4/5 text-xs font-black uppercase sm:text-xsm">
        {name} - {hex}
      </span>
    </MotionCard>
  );
}

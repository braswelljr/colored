'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { colord } from 'colord';
import { parseAsString, useQueryState } from 'nuqs';
import { LuShuffle } from 'react-icons/lu';
import { Color } from '~/components/colors/color';
import { Swatch } from '~/components/colors/swatch';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '~/components/ui/input-group';
import { Skeleton } from '~/components/ui/skeleton';
import { Spinner } from '~/components/ui/spinner';
import { useColorsStore } from '~/store/use-colors';
import { cn } from '~/utils/cn';
import { convertFormat } from '~/utils/colors';
import { randomColor } from '~/utils/random';
import { generateShades, type ShadeScale } from '~/utils/shades';

type GenerateShadesResult = {
  shades: ShadeScale;
  inputColor: string;
};

async function fetchShades(color: string): Promise<GenerateShadesResult> {
  const shades = await generateShades(color);
  return { shades, inputColor: color };
}

export default function Page() {
  const { format, onChangeColorsLen } = useColorsStore();
  const [color, onChangeColor] = useQueryState('q', parseAsString.withDefault('#f0b100'));
  const [isRandomizing, setIsRandomizing] = useState(false);

  const { data: colors, isLoading } = useQuery({
    queryKey: ['shades', color],
    queryFn: () => fetchShades(color),
    staleTime: Infinity,
    enabled: colord(color).isValid()
  });

  useEffect(() => {
    if (colors && colors.shades) {
      const shadeCount = Object.keys(colors.shades).length;
      onChangeColorsLen(shadeCount);
    }
  }, [colors, onChangeColorsLen]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (!value) {
      onChangeColor('');
      return;
    }

    if (colord(value).isValid()) {
      const hexColor = colord(value).toHex();
      onChangeColor(hexColor);
    }
  };

  const handleRandomColor = useCallback(() => {
    setIsRandomizing(true);
    const newColor = randomColor();
    onChangeColor(newColor);
    setTimeout(() => setIsRandomizing(false), 300);
  }, [onChangeColor]);

  const shadeColors = useMemo(() => {
    if (!colors?.shades) return [];
    return Object.entries(colors.shades).map(([step, shade]) => ({
      name: String(step),
      hex: convertFormat({ color: shade.hex, format })
    }));
  }, [colors, format]);

  const c = useMemo(() => convertFormat({ color, format }), [color, format, convertFormat]);
  const isValidColor = color && colord(c).isValid();
  const dark = useMemo(() => colord(color).isDark(), [c]);

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex items-center gap-2 px-3 md:px-12 lg:px-20 xl:px-28">
        <InputGroup>
          <InputGroupAddon
            align="inline-start"
            className="rounded-2xl p-1"
          >
            <InputGroupInput
              placeholder="#3b82f6"
              type="color"
              value={isValidColor ? color : '#f0b100'}
              onChange={(e) => handleColorChange(e)}
              className="size-8 rounded border-0 p-0"
            />
          </InputGroupAddon>

          <InputGroupInput
            type="text"
            value={color}
            onChange={(e) => handleColorChange(e)}
            placeholder="#3b82f6"
            className=""
          />

          <InputGroupAddon
            align="inline-end"
            className="rounded-2xl p-3"
          >
            <InputGroupButton
              variant="default"
              onClick={handleRandomColor}
              disabled={isRandomizing}
              className={cn('size-7 rounded-md')}
              style={{ backgroundColor: color && colord(color).isValid() ? color : '' }}
            >
              {isRandomizing ? (
                <Spinner className="size-4" />
              ) : (
                <LuShuffle className={cn('size-4', dark ? '!text-white' : '!text-neutral-950')} />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <Swatch
          color={isValidColor ? color : '#f0b100'}
          className="text-sm"
        />
      </div>
      <main className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
        {shadeColors && shadeColors.length ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-8 text-xs leading-4">
            {shadeColors.map((shade) => (
              <Color
                key={`color-step-${shade.name}`}
                colour={shade}
              />
            ))}
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-8 text-xs leading-4">
            {Array.from({ length: 12 }).map((_, i) => (
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
                Invalid color format. Please enter a valid hex color code or click the shuffle button for a random
                color.
              </p>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 rounded-lg border border-neutral-300 bg-neutral-100 p-4 text-center text-sm dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-neutral-600 dark:text-neutral-400">
            Click any shade to copy it in your selected format ({format})
          </p>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { colord } from 'colord';
import { parseAsString, useQueryState } from 'nuqs';
import { Color } from '~/components/colors/color';
import { Swatch } from '~/components/colors/swatch';
import { Input } from '~/components/ui/input';
import { Skeleton } from '~/components/ui/skeleton';
import { useColorsStore } from '~/store/use-colors';
import { convertFormat } from '~/utils/colors';
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
    let newColor = e.target.value;

    if (newColor.startsWith('#')) {
      onChangeColor(newColor);
      return;
    }

    newColor = colord(newColor).toHex();
    onChangeColor(newColor);
  };

  const shadeColors = useMemo(() => {
    if (!colors?.shades) return [];
    return Object.entries(colors.shades).map(([step, shade]) => ({
      name: String(step),
      hex: convertFormat({ color: shade.hex, format })
    }));
  }, [colors, format]);

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex items-center gap-2 px-3 md:px-12 lg:px-20 xl:px-28">
        <div className="flex h-full grow gap-1">
          <Input
            placeholder="#3b82f6"
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e)}
            className="size-9 rounded border-0 p-0"
          />

          <Input
            type="text"
            value={color}
            onChange={(e) => handleColorChange(e)}
            placeholder="#3b82f6"
            className=""
          />
        </div>
        <Swatch
          color={color}
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
              <p>Invalid color format. Please enter a valid hex color code. Example "#3b82f6" or "blue".</p>
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

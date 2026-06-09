'use client';

import { Suspense } from 'react';
import { extend } from 'colord';
import cmykPlugin from 'colord/plugins/cmyk';
import lchPlugin from 'colord/plugins/lch';
import { useShallow } from 'zustand/react/shallow';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useColorsStore } from '@/store/use-colors';
import { cn } from '@/utils/cn';
import { COLOR_FORMAT, ColorFormatType, convertFormat } from '@/utils/colors';

extend([cmykPlugin, lchPlugin]);

export function Swatch({
  color = '#efefef',
  className,
  ...props
}: Omit<React.ComponentProps<typeof SelectTrigger>, 'color'> & {
  color?: string;
}) {
  const { format, onChangeFormat } = useColorsStore(
    useShallow((s) => ({ format: s.format, onChangeFormat: s.onChangeFormat }))
  );

  return (
    <Suspense fallback={<ColorFormatSelectorSkeleton />}>
      <Select
        value={format}
        onValueChange={(val) => onChangeFormat(val as ColorFormatType)}
      >
        <SelectTrigger
          className={cn(className)}
          {...props}
        >
          <span className="font-kablammo">Format: </span>
          <span className="font-mono uppercase">{format}</span>
        </SelectTrigger>
        <SelectContent>
          {COLOR_FORMAT.map((value) => (
            <SelectItem
              key={value}
              value={value}
            >
              <span className="font-kablammo font-medium uppercase">{value}</span>
              <span className="font-mono text-xs">{convertFormat({ color, format: value })}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Suspense>
  );
}

export function ColorFormatSelectorSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      className={cn('h-7 w-29 gap-1.5 rounded-lg', className)}
      {...props}
    />
  );
}

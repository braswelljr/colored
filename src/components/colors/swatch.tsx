'use client';

import { Suspense } from 'react';
import { extend } from 'colord';
import cmykPlugin from 'colord/plugins/cmyk';
import lchPlugin from 'colord/plugins/lch';
import { useShallow } from 'zustand/react/shallow';
import { Select, SelectContent, SelectItem, SelectTrigger } from '~/components/ui/select';
import { Skeleton } from '~/components/ui/skeleton';
import { useColorsStore } from '~/store/use-colors';
import { cn } from '~/utils/cn';
import { COLOR_FORMAT, ColorFormatType, convertFormat } from '~/utils/colors';

extend([cmykPlugin, lchPlugin]);

export function Swatch({
  color = '#efefef',
  className,
  ...props
}: Omit<React.ComponentProps<typeof SelectTrigger>, 'color'> & {
  color?: string;
}) {
  const { format, onChangeFormat } = useColorsStore(useShallow((s) => s));

  return (
    <Suspense fallback={<ColorFormatSelectorSkeleton />}>
      <Select
        value={format}
        onValueChange={(val) => onChangeFormat(val as ColorFormatType)}
      >
        <SelectTrigger
          className={cn(
            'h-7 w-auto gap-1.5 rounded border-neutral-900 pr-2 text-sm font-medium dark:border-neutral-500',
            className
          )}
          {...props}
        >
          <span className="">Format: </span>
          <span className="font-mono uppercase">{format}</span>
        </SelectTrigger>
        <SelectContent
          align="end"
          className="rounded-xl"
        >
          {COLOR_FORMAT.map((value) => (
            <SelectItem
              key={value}
              value={value}
              className={cn(
                'gap-2 rounded-lg [&>span]:flex [&>span]:items-center [&>span]:gap-2',
                value === format &&
                  'hocus:bg-yellow-100 dark:hocus:bg-yellow-100/20 bg-yellow-100 dark:bg-yellow-100/20'
              )}
            >
              <span className="font-medium uppercase">{value}</span>
              <span className="font-mono text-xs">{convertFormat({ color, format: value })}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Suspense>
  );
}

export function ColorFormatSelectorSkeleton({ className, ...props }: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      className={cn('h-7 w-[116px] gap-1.5 rounded-lg', className)}
      {...props}
    />
  );
}

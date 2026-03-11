'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { colord } from 'colord';
import { Check, Copy, Shuffle } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { Color } from '~/components/colors/color';
import { Swatch } from '~/components/colors/swatch';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '~/components/ui/input-group';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Skeleton } from '~/components/ui/skeleton';
import { Spinner } from '~/components/ui/spinner';
import { useColorsStore } from '~/store/use-colors';
import { cn } from '~/utils/cn';
import { convertFormat, type ColorFormatType } from '~/utils/colors';
import { randomColor } from '~/utils/random';
import { generateShades, type ShadeScale } from '~/utils/shades';

type GenerateShadesResult = {
  shades: ShadeScale;
  inputColor: string;
};

type ExportFormat = {
  id: string;
  name: string;
  description: string;
  generate: (colorName: string, shades: ShadeScale, colorFormat: ColorFormatType) => string;
};

async function fetchShades(color: string): Promise<GenerateShadesResult> {
  const shades = await generateShades(color);
  return { shades, inputColor: color };
}

const formats: ExportFormat[] = [
  {
    id: 'tailwind-v3',
    name: 'Tailwind v3',
    description: 'JS config for tailwind.config.js',
    generate: (colorName, shades, colorFormat) => {
      const entries = Object.entries(shades)
        .filter(([step]) => step !== 'primary')
        .map(([step, shade]) => `           '${step}': '${convertFormat({ color: shade.hex, format: colorFormat })}',`)
        .join('\n');
      return `module.exports = {
  theme: {
    extend: {
      colors: {
        '${colorName}': {
${entries}
        },
      },
    },
  },
};`;
    }
  },
  {
    id: 'tailwind-v4',
    name: 'Tailwind v4',
    description: 'CSS variables for @theme',
    generate: (colorName, shades, colorFormat) => {
      const primaryColor = convertFormat({ color: shades.primary?.hex ?? '', format: colorFormat });
      const entries = Object.entries(shades)
        .filter(([step]) => step !== 'primary')
        .map(
          ([step, shade]) =>
            `  --color-${colorName}-${step}: ${convertFormat({ color: shade.hex, format: colorFormat })};`
        )
        .join('\n');
      return `@theme {\n  --color-${colorName}: ${primaryColor};\n${entries}\n}`;
    }
  },
  {
    id: 'css-variables',
    name: 'CSS Variables',
    description: 'Standard CSS custom properties',
    generate: (colorName, shades, colorFormat) => {
      const primaryColor = convertFormat({ color: shades.primary?.hex ?? '', format: colorFormat });
      const entries = Object.entries(shades)
        .filter(([step]) => step !== 'primary')
        .map(
          ([step, shade]) =>
            `  --color-${colorName}-${step}: ${convertFormat({ color: shade.hex, format: colorFormat })};`
        )
        .join('\n');
      return `:root {\n  --color-${colorName}: ${primaryColor};\n${entries}\n}`;
    }
  },
  {
    id: 'scss',
    name: 'SCSS Variables',
    description: 'SASS/SCSS variables',
    generate: (colorName, shades, colorFormat) => {
      const primaryColor = convertFormat({ color: shades.primary?.hex ?? '', format: colorFormat });
      const entries = Object.entries(shades)
        .filter(([step]) => step !== 'primary')
        .map(
          ([step, shade]) => `$color-${colorName}-${step}: ${convertFormat({ color: shade.hex, format: colorFormat })};`
        )
        .join('\n');
      return `$color-${colorName}: ${primaryColor};\n${entries}`;
    }
  }
];

export default function Page() {
  const { format, onChangeColorsLen } = useColorsStore();
  const [color, onChangeColor] = useQueryState('q', parseAsString.withDefault('#f0b100'));
  const [colorName, setColorName] = useState('primary');
  const [selectedFormat, setSelectedFormat] = useState(formats[0].id);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: colors, isLoading } = useQuery({
    queryKey: ['shades', color],
    queryFn: () => fetchShades(color),
    staleTime: Infinity,
    enabled: colord(color).isValid()
  });

  useEffect(() => {
    if (colors?.shades) {
      onChangeColorsLen(Object.keys(colors.shades).length);
    }
  }, [colors, onChangeColorsLen]);

  const handleColorPickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeColor(e.target.value);
    },
    [onChangeColor]
  );

  const handleRandomColor = useCallback(() => {
    setIsRandomizing(true);
    onChangeColor(randomColor());
    setTimeout(() => setIsRandomizing(false), 300);
  }, [onChangeColor]);

  const handleCopy = useCallback(() => {
    const selectedFormatObj = formats.find((f) => f.id === selectedFormat);
    if (selectedFormatObj && colors?.shades) {
      const code = selectedFormatObj.generate(colorName, colors.shades, format);
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [colorName, colors?.shades, selectedFormat, format]);

  const shadeColors = useMemo(() => {
    if (!colors?.shades) return [];
    return Object.entries(colors.shades).map(([step, shade]) => ({
      name: String(step),
      hex: convertFormat({ color: shade.hex, format })
    }));
  }, [colors?.shades, format]);

  const colorValidation = useMemo(() => {
    const instance = colord(color);
    return {
      isValid: color && instance.isValid(),
      isDark: instance.isDark()
    };
  }, [color]);

  const generatedCode = useMemo(() => {
    const selectedFormatObj = formats.find((f) => f.id === selectedFormat);
    if (selectedFormatObj && colors?.shades) {
      return selectedFormatObj.generate(colorName, colors.shades, format);
    }
    return '';
  }, [colorName, colors?.shades, selectedFormat, format]);

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
              value={colorValidation.isValid ? color : '#f0b100'}
              onChange={handleColorPickerChange}
              className="size-8 rounded border-0 p-0"
            />
          </InputGroupAddon>

          <InputGroupInput
            type="text"
            value={color}
            onChange={(e) => onChangeColor(e.target.value)}
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
              style={{ backgroundColor: colorValidation.isValid ? color : '' }}
            >
              {isRandomizing ? (
                <Spinner className="size-4" />
              ) : (
                <Shuffle className={cn('size-4', colorValidation.isDark ? '!text-white' : '!text-neutral-950')} />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <Swatch
          color={colorValidation.isValid ? color : '#f0b100'}
          className="text-sm"
        />
      </div>

      <main className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
        {shadeColors.length > 0 ? (
          <div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-8 text-xs leading-4">
              {shadeColors.map((shade) => (
                <Color
                  key={`color-step-${shade.name}`}
                  colour={shade}
                />
              ))}
            </div>

            {/* Export Code Block */}
            <div className="mt-8 rounded-lg border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-300 px-4 py-3 dark:border-neutral-700">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Color Name Input */}
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="color-name"
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      Color name:
                    </Label>
                    <Input
                      id="color-name"
                      type="text"
                      value={colorName}
                      onChange={(e) => setColorName(e.target.value)}
                      placeholder="primary"
                      className="h-8 rounded-md border border-neutral-300 bg-neutral-50 px-2 text-sm dark:border-neutral-600 dark:bg-neutral-800"
                    />
                  </div>

                  {/* Format Selector */}
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">Format:</Label>
                    <Select
                      value={selectedFormat}
                      onValueChange={setSelectedFormat}
                    >
                      <SelectTrigger className="h-8 w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map((fmt) => (
                          <SelectItem
                            key={fmt.id}
                            value={fmt.id}
                          >
                            {fmt.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Copy Button */}
              </div>

              {/* Format Description */}
              <div className="flex items-center justify-between border-b border-neutral-300 px-4 py-2 dark:border-neutral-700">
                <p className="text-sm">{formats.find((f) => f.id === selectedFormat)?.description}</p>

                <Button
                  type="button"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7"
                >
                  {copied ? (
                    <>
                      <Check className="size-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              {/* Code Block */}
              <div className="overflow-x-auto p-4">
                <pre className="text-sm">
                  <code className="font-mono text-neutral-800 dark:text-neutral-200">{generatedCode}</code>
                </pre>
              </div>
            </div>
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

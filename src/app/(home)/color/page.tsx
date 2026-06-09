'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { colord } from 'colord';
import { motion } from 'motion/react';
import { parseAsString, useQueryState } from 'nuqs';
import { HiViewGridAdd } from 'react-icons/hi';
import { TbRefresh } from 'react-icons/tb';
import { useInView } from 'react-intersection-observer';
import { Color } from '@/components/colors/color';
import { Swatch } from '@/components/colors/swatch';
import { cardVariants, containerVariants, itemVariants } from '@/components/shared/motion';
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertMedia,
  AlertTitle
} from '@/components/ui/alert';
import { CodeEditor } from '@/components/ui/code-editor';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { useColorsStore } from '@/store/use-colors';
import { cn } from '@/utils/cn';
import { convertFormat, type ColorFormatType } from '@/utils/colors';
import { randomColor } from '@/utils/random';
import { generateShades, type ShadeScale } from '@/utils/shades';

type GenerateShadesResult = {
  shades: ShadeScale;
  inputColor: string;
};

type ExportFormat = {
  id: string;
  name: string;
  description: string;
  lang: string;
  filename: string;
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
    lang: 'javascript',
    filename: 'tailwind.config.js',
    generate: (colorName, shades, colorFormat) => {
      const entries = Object.entries(shades)
        .filter(([step]) => step !== 'primary')
        .map(
          ([step, shade]) =>
            `           '${step}': '${convertFormat({ color: shade.hex, format: colorFormat })}',`
        )
        .join('\n');
      return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        '${colorName}': {\n${entries}\n        },\n      },\n    },\n  },\n};`;
    }
  },
  {
    id: 'tailwind-v4',
    name: 'Tailwind v4',
    description: 'CSS variables for @theme',
    lang: 'css',
    filename: 'globals.css',
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
    lang: 'css',
    filename: 'variables.css',
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
    lang: 'scss',
    filename: 'variables.scss',
    generate: (colorName, shades, colorFormat) => {
      const primaryColor = convertFormat({ color: shades.primary?.hex ?? '', format: colorFormat });
      const entries = Object.entries(shades)
        .filter(([step]) => step !== 'primary')
        .map(
          ([step, shade]) =>
            `$color-${colorName}-${step}: ${convertFormat({ color: shade.hex, format: colorFormat })};`
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

  const [gridRef, gridInView] = useInView({ threshold: 0.05 });

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

  const shadeColors = useMemo(() => {
    if (!colors?.shades) return [];
    return Object.entries(colors.shades).map(([step, shade]) => ({
      name: String(step),
      hex: shade.hex
    }));
  }, [colors]);

  const colorValidation = useMemo(() => {
    const instance = colord(color);
    return {
      isValid: color && instance.isValid(),
      isDark: instance.isDark()
    };
  }, [color]);

  const activeFormat = useMemo(
    () => formats.find((f) => f.id === selectedFormat) ?? formats[0],
    [selectedFormat]
  );

  const generatedCode = useMemo(() => {
    if (activeFormat && colors?.shades) {
      return activeFormat.generate(colorName, colors.shades, format);
    }
    return '';
  }, [colorName, colors, activeFormat, format]);

  return (
    <div className="flex h-full flex-1 flex-col">
      {/* ── Color picker bar ── */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-2 px-3 md:px-12 lg:px-20 xl:px-28"
      >
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
            >
              {isRandomizing ? (
                <Spinner className="size-4" />
              ) : (
                <TbRefresh className={cn('size-4', 'text-neutral-950!')} />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <Swatch
          color={colorValidation.isValid ? color : '#f0b100'}
          className="text-sm"
        />
      </motion.div>

      {/* ── Main content ── */}
      <main className="px-3 py-4 md:px-12 lg:px-20 xl:px-28">
        {shadeColors.length > 0 ? (
          <div className="space-y-8">
            {/* Shade grid */}
            <motion.div
              ref={gridRef}
              variants={containerVariants}
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
              className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-6 text-xs leading-4"
            >
              {shadeColors.map((shade) => (
                <Color
                  key={`color-step-${shade.name}`}
                  colour={shade}
                  variants={cardVariants}
                />
              ))}
            </motion.div>

            <CodeEditor
              code={generatedCode}
              language={activeFormat.lang}
              filename={activeFormat.filename}
              tabs={formats.map((f) => ({
                id: f.id,
                label: f.filename,
                name: f.name,
                lang: f.lang,
                description: f.description
              }))}
              activeTab={selectedFormat}
              onTabChange={setSelectedFormat}
              colorName={colorName}
              onColorNameChange={setColorName}
            />
          </div>
        ) : isLoading ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-8 text-xs leading-4"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
              >
                <Skeleton className="h-24 w-full rounded-md" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex min-h-[50vh] w-full items-center justify-center"
          >
            <p className="mx-auto mb-3 max-w-xl text-center text-lg leading-6 font-medium text-zinc-500">
              Invalid color format. Please enter a valid hex color code or click the shuffle button
              for a random color.
            </p>
          </motion.div>
        )}

        <Alert
          variant="info"
          className="mt-8"
        >
          <AlertMedia
            variant="info"
            className="size-12"
          >
            <HiViewGridAdd className="size-5" />
          </AlertMedia>
          <AlertContent className="font-mono">
            <AlertTitle className="font-kablammo font-bold">Heads up!</AlertTitle>
            <AlertDescription>
              You can click on any shade to copy it in your selected format.
            </AlertDescription>
          </AlertContent>
        </Alert>
      </main>
    </div>
  );
}

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ColorFormatType, convertFormat } from '~/utils/colors';

type ColorStoreState = {
  format: ColorFormatType;
  colorsLen: number;
  paletteLen: number;
};

type ColorStoreActions = {
  onChangeFormat: (value: ColorFormatType | ((prevState: ColorFormatType) => ColorFormatType)) => void;
  convertFormat: (color: string, options?: { format: ColorFormatType }) => string;
  onChangeColorsLen: (value: number | ((prevState: number) => number)) => void;
  onChangePaletteLen: (value: number | ((prevState: number) => number)) => void;
};

type ColorStore = ColorStoreState & ColorStoreActions;

export const useColorsStore = create<ColorStore>()(
  devtools(
    persist(
      (set) => ({
        format: 'hex',

        onChangeFormat: (value) => {
          set(({ format }) => ({
            format: typeof value === 'function' ? value(format) : value
          }));
        },

        convertFormat(color, options = { format: 'hex' }) {
          return convertFormat({ color, format: options.format });
        },

        colorsLen: 50,

        onChangeColorsLen: (value) => {
          set(({ colorsLen }) => ({
            colorsLen: typeof value === 'function' ? value(colorsLen) : value
          }));
        },
        paletteLen: 50,

        onChangePaletteLen: (value) => {
          set(({ paletteLen }) => ({
            paletteLen: typeof value === 'function' ? value(paletteLen) : value
          }));
        }
      }),
      {
        name: 'ColorsStore',
        partialize: ({ format }) => ({ format })
      }
    ),
    { name: 'ColorsStore' }
  )
);

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ColorFormatType, convertFormat } from '~/utils/colors';

type ColorStoreState = {
  format: ColorFormatType;
};

type ColorStoreActions = {
  onChangeFormat: (value: ColorFormatType | ((prevState: ColorFormatType) => ColorFormatType)) => void;
  convertFormat: (color: string, options?: { format: ColorFormatType }) => string;
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

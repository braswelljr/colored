import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ColorType } from '~/data/colors';

type FavoriteStoreState = {
  favorites: Array<ColorType>;
  state: boolean;
};

type FavoriteStoreActions = {
  onChangeState: (value: boolean | ((prevState: boolean) => boolean)) => void;
  addFavorite: (color: ColorType) => boolean;
  removeFavorite: (hex: string) => void;
  toggleFavorite: (color: ColorType) => void;
  isFavorite: (hex: string) => boolean;
  getFavorites: () => ColorType[];
};

type FavoriteStore = FavoriteStoreState & FavoriteStoreActions;

export const useFavoriteStore = create<FavoriteStore>()(
  devtools(
    persist(
      (set, get) => ({
        state: false,
        favorites: [],

        onChangeState: (value) => {
          set(({ state }) => ({
            state: typeof value === 'function' ? value(state) : value
          }));
        },

        addFavorite: (color) => {
          const exists = get().isFavorite(color.hex);
          if (!exists) {
            set(({ favorites }) => ({ favorites: [...favorites, color] }));
          }
          return !exists;
        },

        removeFavorite: (hex) => {
          set(({ favorites }) => ({
            favorites: favorites.filter((color) => color.hex !== hex)
          }));
        },

        toggleFavorite: (color) => {
          const { isFavorite, favorites } = get();
          if (isFavorite(color.hex)) {
            set({ favorites: favorites.filter((c) => c.hex !== color.hex) });
          } else {
            set({ favorites: [...favorites, color] });
          }
        },

        isFavorite: (hex) => {
          return get().favorites.some((color) => color.hex === hex);
        },

        getFavorites: () => {
          return [...get().favorites];
        }
      }),
      {
        name: 'FavoriteStore',
        partialize: ({ favorites }) => ({ favorites })
      }
    ),
    { name: 'FavoriteStore' }
  )
);

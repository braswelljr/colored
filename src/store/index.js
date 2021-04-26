import create from "zustand";
import { devtools } from "zustand/middleware";
import { colored } from "../assets/three";
import { matchSorter } from "match-sorter";

const useStore = create(
  devtools(set => ({
    colors: colored,
    query: "",
    filter: undefined,
    search: (collection, query) =>
      set({
        query,
        filter: query
          ? matchSorter(collection, query, {
              threshold: matchSorter.rankings.WORD_STARTS_WITH,
              keys: ["string.hsl", "string.rgb", "string.hex", "name", "tag.*"]
          })
          : undefined
      }),
    theme: {
      state: "light",
      foreground: "#9E2A2B",
      background: "#F2CC8F",
      honey: "#FFE66D"
    },
    themeDark: () =>
      set(state => ({
        theme: (state.theme = {
          state: "dark",
          foreground: "#2B2222",
          background: "#F7ECC1",
          honey: "#F7ECC1"
        })
      })),
    themeLight: () =>
      set(state => ({
        theme: (state.theme = {
          state: "light",
          foreground: "#9E2A2B",
          background: "#F2CC8F",
          honey: "#FFE66D"
        })
      })),
    format: "hsl",
    gen: { state: "closed", name: "", color: {} },
    openGen: (name, color) =>
      set(state => ({
        gen: (state.gen = {
          state: "opened",
          name: name,
          color: color
        })
      })),
    closeGen: () =>
      set(state => ({
        gen: (state.gen = { state: "closed", name: "", color: {} })
      })),
    setRGB: () => set(state => ({ format: (state.format = "rgb") })),
    setHSL: () => set(state => ({ format: (state.format = "hsl") })),
    setHEX: () => set(state => ({ format: (state.format = "hex") }))
  }))
);

export default useStore;

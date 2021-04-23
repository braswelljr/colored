import { createContext } from "react";

export const theme = {
  light: {
    foreground: "#9E2A2B",
    background: "#F2CC8F",
    honey: "#FFE66D",
    net: "%23242424"
  },
  dark: {
    foreground: "#2B2222",
    background: "#F7ECC1",
    honey: "#F7ECC1",
    net: "%23f4dada"
  }
};

export const ThemeContext = createContext(theme.light);

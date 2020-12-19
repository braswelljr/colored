module.exports = {
  purge: {
    mode: "all",
    enabled: process.env.NODE_ENV === "production" ? true : false,
    content: [
      "./components/**/*.{vue, js, jsx, ts, tsx, html}",
      "./pages/**/*.{vue, js, jsx, ts, tsx, html}"
    ],
    preserveHtmlElements: true
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "320px",
      sm: "480px",
      md: "640px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    extend: {
      fontFamily: {
        langar: ["'Langar'", "display"],
        mulish: ["'Mulish'", "system-ui", "sans-serif"],
        monoton: ["'Monoton'", "display"]
      },
      colors: {},
      animation: {
        moveBackground: "moveBackground 10s ease-in alternate infinite"
      },
      keyframes: {
        moveBackground: {
          "0%": { backgroundPosition: "0 50%" },
          "50%": { backgroundPosition: "50% 100%" },
          "100%": { backgroundPosition: "50% 0" }
        }
      }
    }
  },
  variants: {
    extend: {
      ringOffsetWidth: ["hover", "active"]
    }
  },
  plugins: [require("@tailwindcss/aspect-ratio")]
};

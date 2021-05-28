const color = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["'Mulish'", ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        gray: color.trueGray,
        emerald: color.emerald,
        cyan: color.cyan,
        amber: color.amber
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

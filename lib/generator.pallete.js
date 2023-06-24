/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFile } = require('fs')
const cnl = require('color-name-list')
const nc = require('nearest-color')

function getColorName(color) {
  const cn = cnl.find(c => c.hex === color)
  const colors = cnl.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {}) // map the colors to their names
  const nearest = nc.from(colors) // get the nearest color
  // get the name of the color or the nearest color or return the hex value
  const nearestname = nearest(color)

  // get the name of the color or the nearest color or return the hex value
  return {
    name: cn ? cn.name : nearestname ? nearestname.name : undefined || color,
    color: cn ? cn.hex : nearestname ? nearestname.value : undefined || color
  }
}

/**
 * generateRandomHexColor - generates random array of colors using time as a seed
 * @return {string}
 */
function generateRandomHexColor() {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  )
}

const total = 300 // total number of palletes to generate
const palleteLen = 5 // number of colors in each pallete

let palletes = []

// Generate unique random colors
Array.from({ length: total }, () => {
  const colors = []

  while (colors.length < palleteLen) {
    const color = generateRandomHexColor()
    const colorName = getColorName(color)
    const nc = { name: colorName.name, hex: colorName.color }

    if (!colors.includes(nc)) colors.push(nc)
  }

  palletes.push(colors)
})

const data = JSON.stringify(palletes)

writeFile('./lib/palletes.json', data, error => {
  if (error) console.log("couldn't generate file")
  else console.log('operation successfull')
})

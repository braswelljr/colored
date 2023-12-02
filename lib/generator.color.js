/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFile, access, constants } = require('fs')
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

const filePath = './lib/colors.json'

access(filePath, constants.F_OK, err => {
  if (err) {
    const total = 810

    // generate unique random hex colors efficiently and remove duplicates
    let colors = []

    while (colors.length < total) {
      const color = generateRandomHexColor()
      if (!colors.includes(color)) colors.push(color)
    }

    const data = JSON.stringify(
      colors.map(color => {
        const colorName = getColorName(color)
        return { name: colorName.name, hex: colorName.color }
      })
    )

    writeFile(filePath, data, error => {
      if (error) console.log("couldn't generate file")
      else console.log('operation successfull')
    })
  }
})

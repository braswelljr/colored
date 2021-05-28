const fs = require('fs')
const colorName = require('color-name-list')

function HSLtoRGB(hsl) {
  // Must be fractions of 1
  hsl.s /= 100
  hsl.l /= 100

  let c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s,
    x = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1)),
    m = hsl.l - c / 2,
    r = 0,
    g = 0,
    b = 0

  if (0 <= hsl.h && hsl.h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= hsl.h && hsl.h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= hsl.h && hsl.h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= hsl.h && hsl.h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= hsl.h && hsl.h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= hsl.h && hsl.h <= 360) {
    r = c
    g = 0
    b = x
  }
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return { r: r, g: g, b: b }
}

function RGBtoHEX(rgb) {
  let r = rgb.r.toString(16)
  let g = rgb.g.toString(16)
  let b = rgb.b.toString(16)

  if (r.length == 1) r = '0' + r
  if (g.length == 1) g = '0' + g
  if (b.length == 1) b = '0' + b

  return '#' + r + g + b
}

//for hsl
function hsl(collection, type) {
  const hue = 360 //-> represented in degrees
  const saturation = 100 //-> represented in percentage
  const light = 50 //-> represented in percentage

  for (let h = 1; h <= hue; h += 1) {
    //for (let s = 0; s <= saturation; s += 10) { //=> for splitting colors into color spaces with saturation
    type !== 'string'
      ? collection.push({ h: h, s: saturation, l: light })
      : collection.push(`"${h}, ${saturation}%, ${light}%"`)
  }

  //hsl: "hsl(${h}, ${saturation}%, ${light}%)"
  //rgb: "${HSLtoRGB("hsl(${h}, ${saturation}%, ${light}%)")}"

  return [...new Set(collection)]
}

let hs = [...hsl([], 'object')]
let rg = hs.map(color => HSLtoRGB(color))
let he = rg.map(color => RGBtoHEX(color))
let names = he.map(color => {
  let c = colorName.find(c => c.hex === color)
  color = typeof c === 'object' ? c.name : ''
  return color
})
let colors = []

// for (let i = 0; i < hs.length; i++) {
//   for (let j = 0; j < rg.length; j++) {
//     for (let k = 0; k < he.length; k++) {
//       if (i === j && j === k) {
//         colors.push(
//           `{ hsl: {h: ${hs[i].h}, s: ${hs[i].s * 100}, l: ${
//             hs[i].l * 100
//           }}, rgb: {r: ${rg[j].r}, g: ${rg[j].g}, b: ${rg[j].b}}, hex: "${
//             he[k]
//           }" }`
//         );
//       }
//     }
//   }
// }

// for (let i = 0; i < hs.length; i++) {
//   for (let j = 0; j < rg.length; j++) {
//     for (let k = 0; k < he.length; k++) {
//       if (i === j && j === k) {
//         colors.push(
//           `{ hsl: "hsl(${hs[i].h}, ${hs[i].s * 100}%, ${
//             hs[i].l * 100
//           }%)", rgb: "rgb(${rg[j].r}, ${rg[j].g}, ${rg[j].b})", hex: "${
//             he[k]
//           }" }`
//         );
//       }
//     }
//   }
// }

for (let i = 0; i < hs.length; i++) {
  for (let j = 0; j < rg.length; j++) {
    for (let k = 0; k < he.length; k++) {
      for (let l = 0; l < names.length; l++) {
        if (i === j && j === k && k === l) {
          colors.push(
            `{ name: "${names[l]}", tags: [], string: { hsl: "hsl(${hs[i].h}, ${hs[i].s * 100}%, ${
              hs[i].l * 100
            }%)", rgb: "rgb(${rg[j].r}, ${rg[j].g}, ${rg[j].b})", hex: "${
              he[k]
            }"}, obj: { hsl: {h: ${hs[i].h}, s: ${hs[i].s * 100}, l: ${hs[i].l * 100}}, rgb: {r: ${
              rg[j].r
            }, g: ${rg[j].g}, b: ${rg[j].b}}, hex: "${he[k]}" }}`
          )
        }
      }
    }
  }
}

fs.writeFile(`../assets/three.js`, `export const colored = [${[...colors]}];`, error =>
  error
    ? console.error(error)
    : console.log(`Successfully generated hsl with ${colors.length} colors`)
)

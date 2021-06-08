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

// //for hsl
// function hsl(collection) {
//   const hue = 360 //-> represented in degrees
//   const saturation = 100 //-> represented in percentage
//   const light = 50 //-> represented in percentage

//   for (let h = 1; h <= hue; h += 1) {
//     for (let s = 0; s <= saturation; s += 5) {
//       // for (let l = 0; l <= saturation; l += 10) {
//       collection.push({ h: h, s: s, l: light })
//       // }
//     }
//   }

//   return [...new Set(collection)]
// }

function HSL(array) {
  for (let h = 1; h <= 360; h++) {
    for (let s = 0; s <= 100; s = s + 50) {
      for (let l = 0; l <= 100; l = l + 25) {
        // if ((l % 25 == 0 && s % 25 == 0) ) {
        array.push({ h: h, s: s, l: l })
        // }
      }
    }
  }

  return [...new Set(array)]
}
let hs = HSL([])
let rg = hs.map(color => HSLtoRGB(color))
let he = rg.map(color => RGBtoHEX(color))
let names = he.map(color => {
  let c = colorName.find(c => c.hex === color)
  color = typeof c === 'object' ? (c.name === undefined ? '' : c.name) : ''
  return color
})
let colors = []

// for (var i = 0; i < hs.length; i++) {
//   colors.push(
//     `{name:"${names[i]}",hex:"${he[i]}",rgb:{r:${rg[i].r},g:${rg[i].g},b:${
//       rg[i].b
//     }},hsl:{h:${hs[i].h},s:${Math.round(hs[i].s * 100)},l:${Math.round(
//       hs[i].l * 100
//     )}}}`
//   )
// }

for (var i = 0; i < hs.length; i++) {
  colors.push({
    name: names[i],
    hex: he[i],
    rgb: { r: rg[i].r, g: rg[i].g, b: rg[i].b },
    hsl: {
      h: hs[i].h,
      s: Math.round(hs[i].s * 100),
      l: Math.round(hs[i].l * 100)
    }
  })
}

// colors.push(
//   `{name:"${names[l]}",hex:"${he[k]}",string:{hsl:"hsl(${
//     hs[i].h
//   },${hs[i].s * 100}%,${hs[i].l * 100}%)",rgb:"rgb(${rg[j].r},${
//     rg[j].g
//   },${rg[j].b})"},obj:{hsl:{h:${hs[i].h},s:${hs[i].s * 100},l:${
//     hs[i].l * 100
//   }},rgb:{r:${rg[j].r},g:${rg[j].g},b:${rg[j].b}}}}`
// )

fs.writeFile(
  `../assets/colors.json`,
  // `module.exports = [${[...colors]}]`,
  JSON.stringify([...new Map(colors.map(i => [i.hex, i])).values()]),
  'utf-8',
  error =>
    error
      ? console.error(error)
      : console.log(
        `Successfully generated with ${
          [...new Map(colors.map(i => [i.hex, i])).values()].length
        } colors`
      )
)

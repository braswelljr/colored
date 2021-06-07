import colorName from 'color-name-list'

export function HSL(array) {
  for (let h = 1; h <= 360; h++) {
    for (let s = 1; s <= 100; s++) {
      for (let l = 1; l <= 100; l++) {
        array.push({ h: h, s: s, l: l })
      }
    }
  }

  return array
}

export function RGB(array) {
  for (let r = 0; r <= 255; r++) {
    for (let g = 0; g <= 255; g++) {
      for (let b = 0; b <= 255; b++) {
        array.push({ r: r, g: g, b: b })
      }
    }
  }

  return array
}

export const namers = colorSet =>
  colorSet.map(color => {
    let c = colorName.find(c => c.hex === color)
    color = typeof c === 'object' ? c.name : ''
    return color
  })

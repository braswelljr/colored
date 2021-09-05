import colorName from 'color-name-list'

export const namers = async colorSet =>
  colorSet.map(color => {
    let c = colorName.find(c => c.hex === color)
    color = typeof c === 'object' ? c.name : ''
    return color
  })

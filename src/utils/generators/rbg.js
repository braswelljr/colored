export async function RGB(array) {
  for (let r = 0; r <= 255; r++) {
    for (let g = 0; g <= 255; g++) {
      for (let b = 0; b <= 255; b++) {
        array.push({ r: r, g: g, b: b })
      }
    }
  }

  return array
}

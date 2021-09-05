export async function HSL(array) {
  for (let h = 1; h <= 360; h++) {
    for (let s = 1; s <= 100; s++) {
      for (let l = 1; l <= 100; l++) {
        array.push({ h: h, s: s, l: l })
      }
    }
  }

  return array
}

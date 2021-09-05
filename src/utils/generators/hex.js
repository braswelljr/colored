export async function HEX(array) {
  for (let i = 0; i <= 16777215; i + 15) {
    array.push((i * 0xffffff).toString(16))
  }

  return array
}

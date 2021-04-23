const fs = require("fs");

//for hsl
function hsl(collection, type) {
  const hue = 360; //-> represented in degrees
  const saturation = 100; //-> represented in percentage
  const light = 50; //-> represented in percentage

  for (let h = 1; h <= hue; h += 1) {
    //for (let s = 0; s <= saturation; s += 10) { //=> for splitting colors into color spaces with saturation
    type !== "string"
      ? collection.push(`{ h: ${h}, s: ${saturation}, l: ${light} }`)
      : collection.push(`"hsl(${h}, ${saturation}%, ${light}%)"`);
  }

  return [...new Set(collection)];
}

fs.writeFile(
  `../assets/source.js`,
  `export const colored = [${[...hsl([], "object")]}];`,
  error =>
    error
      ? console.error(error)
      : console.log(
          `Successfully generated hsl with ${[...hsl([])].length} colors`
        )
);

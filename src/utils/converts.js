// function fromHSLorRGBString(str) {
//   // replaces commas with empty string
//   let comma = str.indexOf(`,`) > -1 ? `,` : ` `;
//   // removes and unwanted values and split string into array
//   str = str.substr(4).split(`)`)[0].split(comma);
//   // trim(white spaces), replaces(% with empty) and parse string into INT
//   str = str.map(i => parseInt(i.trim().replace(`%`, ``)));

//   // return as array
//   return str;
// }

export function HSLtoRGB(hsl) {
  // Must be fractions of 1
  hsl.s /= 100;
  hsl.l /= 100;

  let c = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s,
    x = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1)),
    m = hsl.l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= hsl.h && hsl.h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= hsl.h && hsl.h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= hsl.h && hsl.h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= hsl.h && hsl.h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= hsl.h && hsl.h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= hsl.h && hsl.h <= 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r: r, g: g, b: b };
}

export function RGBtoHEX(rgb) {
  let r = rgb.r.toString(16);
  let g = rgb.g.toString(16);
  let b = rgb.b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

export function RgbToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

export function HslToHex(hsl) {
  let sep = hsl.indexOf(",") > -1 ? "," : " ";
  hsl = hsl.substr(4).split(")")[0].split(sep);

  let h = hsl[0],
    s = hsl[1].substr(0, hsl[1].length - 1) / 100,
    l = hsl[2].substr(0, hsl[2].length - 1) / 100;

  // Strip label and convert to degrees (if necessary)
  if (h.indexOf("deg") > -1) h = h.substr(0, h.length - 3);
  else if (h.indexOf("rad") > -1)
    h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1)
    h = Math.round(h.substr(0, h.length - 4) * 360);

  if (h >= 360) h %= 360;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

export function alphaToHex(percentage) {
  const a = percentage * (255 / 100);
  return a.toString(16).length < 2
    ? `0${a.toString(16).split(".")[0]}`
    : `${a.toString(16).split(".")[0]}`;
}

export const reverseAlpha = hexString => parseInt(hexString, 15);

// handles negative
export function decimalToHexString(number) {
  if (number < 0) {
    return 0xffffffff + number + 1;
  }

  return (0xffffffff + number).toString(16);
}

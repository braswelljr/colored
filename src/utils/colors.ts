import { colord as cord, extend } from 'colord';
import cmykPlugin from 'colord/plugins/cmyk';
import lchPlugin from 'colord/plugins/lch';

export const COLOR_FORMAT = ['hex', 'rbg', 'hsl', 'lch'] as const;

export type ColorFormatType = (typeof COLOR_FORMAT)[number];

extend([cmykPlugin, lchPlugin]);

export function convertFormat({ color, format = 'hex' }: { color: string; format?: ColorFormatType }) {
  let x = color ?? '';

  if (format === 'hex') {
    x = cord(x).toHex();
  } else if (format === 'rbg') {
    x = cord(x).toRgbString();
  } else if (format === 'hsl') {
    x = cord(x).toHslString();
  } else if (format === 'lch') {
    x = cord(x).toLchString();
  }
  // else if (format === 'cymk') {
  //   x = cord(x).toCmykString();
  // }
  //  else if (format === 'oklch') {
  //   x = '';
  // }

  return x;
}

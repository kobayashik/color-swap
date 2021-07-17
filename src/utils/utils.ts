import { fromString } from 'css-color-converter';

export function convertColorToHex(color: string) {
  return fromString(color).toHexString();
}

export function convertColorToRGB(color: string) {
  return fromString(color).toRgbString();
}

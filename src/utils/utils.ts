import { fromString } from 'css-color-converter';

export function convertColor(color: string): string {
  const HEX_REGEX = /#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gi;

  if (HEX_REGEX.test(color)) {
    return fromString(color).toRgbString();
  }

  return fromString(color).toHexString();
}

export function convertColorToHex(color: string) {
  return fromString(color).toHexString();
}

export function convertColorToRGB(color: string) {
  return fromString(color).toRgbString();
}

import { fromString } from "css-color-converter";

export function isHexColor(input: string) {
  return /#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gi.test(input);
}

export function toHex(color: string) {
  return fromString(color).toHexString();
}

export function toRGB(color: string) {
  return fromString(color).toRgbString();
}
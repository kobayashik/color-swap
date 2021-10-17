import { fromString } from 'css-color-converter';
import Color from 'color';

export const convertColorToHex = (color: string) => fromString(color).toHexString();

export const convertColorToRGB = (color: string) => fromString(color).toRgbString();

export const getContrastingColor = (color: string) => {
  try {
    const initial = Color(color);
    const lightness = initial.lightness();
    const darkened = initial.darken(0.1).fade(0.6).string();
    const lightened = initial.lightness(lightness + 80).fade(0.8).string();

    return initial.isLight() ? darkened : lightened;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const getOpaqueContrastingColor = (color: string) => {
  try {
    const initial = Color(color);
    const lightness = initial.lightness();
    const darkened = initial.darken(0.8).opaquer(1).string();
    const lightened = initial.lightness(lightness + 80).opaquer(1).string();

    return initial.isLight() ? darkened : lightened;
  } catch (err) {
    console.log(err);
  }

  return null;
};

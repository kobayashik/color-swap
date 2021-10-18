import Color from 'color';
import { STARTING_COLORS } from '../constants';

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * STARTING_COLORS.length);
  return STARTING_COLORS[randomIndex];
};

export const swapColor = (color: string, currentColor: string) => {
  const HEX = /#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gi;

  let swapped = currentColor;
  let error = '';

  try {
    if (HEX.test(color)) {
      swapped = Color(color).rgb().string();
    } else {
      swapped = Color(color).hex();
    }
  } catch (err) {
    error = 'Cannot Parse';
  }

  return { color: swapped, error };
};

export const getContrastingColor = (color: string) => {
  const initial = Color(color);
  const darkened = initial.darken(0.1).fade(0.6).string();
  const lightened = initial.lightness(initial.lightness() + 80).fade(0.8).string();

  return initial.isLight() ? darkened : lightened;
};

export const getOpaqueContrastingColor = (color: string) => {
  const initial = Color(color);
  const darkened = initial.darken(0.8).opaquer(1).string();
  const lightened = initial.lightness(initial.lightness() + 80).opaquer(1).string();

  return initial.isLight() ? darkened : lightened;
};

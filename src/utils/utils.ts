import Color from 'color';
import { COLORS } from '../constants';

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};

export const swapColor = (color: string, oldColor: string) => {
  const HEX = /#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gi;

  try {
    if (HEX.test(color)) {
      return Color(color).rgb().string();
    }
    return Color(color).hex();
  } catch (err) {
    return oldColor;
  }
};

export const getColor = (
  color: Color<string>,
  darkened: Color<string> | string,
  lightend: Color<string> | string,
) => {
  if (color.luminosity() > 0.7) {
    return darkened;
  }
  return lightend;
};

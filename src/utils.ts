import { colord, getFormat } from 'colord';

export const parseInput = (input: string) => {
  const c = colord(input);
  const format = getFormat(input);

  return {
    input,
    format,
    hex: c.toHex(),
    rgb: c.toRgbString(),
    hsl: c.toHslString(),
  };
};

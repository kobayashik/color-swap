import Color from 'color';
import { atom, selector } from 'recoil';
import { getRandomColor, swapColor, getColor } from './utils';

interface State {
  color: string,
  copied: boolean;
}

const copiedEffect = () => ({ setSelf, onSet }) => {
  onSet(async (state: State) => {
    const { copied, color } = state;

    if (!copied) return null;
    await navigator.clipboard.writeText(color);

    const timeout = setTimeout(() => setSelf({ ...state, copied: false }), 10);
    return () => clearTimeout(timeout);
  });
};

export const appState = atom({
  key: 'state',
  default: {
    color: getRandomColor(),
    copied: false,
  },
  effects_UNSTABLE: [
    copiedEffect(),
  ],
});

export const colorState = selector({
  key: 'color',
  get: ({ get }) => get(appState).color,
  set: ({ set, get }, color: string) => {
    const state = get(appState);
    const swapped = swapColor(color, state.color);

    set(appState, { ...state, color: swapped });
  },
});

export const copiedState = selector({
  key: 'copiedState',
  get: ({ get }) => get(appState).copied,
  set: ({ set, get }, copied: boolean) => set(appState, { ...get(appState), copied }),
});

export const appThemeState = selector({
  key: 'appThemeState',
  get: ({ get }) => {
    const color = Color(get(colorState));

    return {
      primary: color,
      secondary: '#667085',
      input: '#1F2937',
      border: getColor(color, color.darken(0.7), color),
      buttonColor: getColor(color, color.darken(0.7), '#fff'),
      buttonFocus: getColor(color, color.darken(0.1), color.lighten(0.1)),
      borderRadius: '8px',
      error: 'lightcoral',
    };
  },
});

export default appState;

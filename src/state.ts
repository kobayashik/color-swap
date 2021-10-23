import { atom, selector } from 'recoil';
import { getRandomColor, swapColor } from './utils';

interface State {
  color: string,
  copied: boolean;
  error: string,
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
    error: '',
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

export const errorState = selector({
  key: 'error',
  get: ({ get }) => get(appState).error,
});

export const appThemeState = selector({
  key: 'appThemeState',
  get: ({ get }) => {
    const { color } = get(appState);

    return {
      primary: color,
      secondary: '#FFF',
      focus: color,
      input: '#FFF',
      contrast: '#00FFFF',
      borderRadius: '8px',
      error: 'lightcoral',
    };
  },
});

export default appState;

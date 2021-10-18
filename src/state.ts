import { atom } from 'recoil';
import { getRandomColor } from './utils';

export const appState = atom({
  key: 'state',
  default: {
    color: getRandomColor(),
    error: '',
  },
});

const copiedEffect = () => ({ setSelf, onSet }) => {
  onSet((copied: boolean) => {
    if (copied) {
      const timeout = setTimeout(() => setSelf(false), 5000);

      return () => clearTimeout(timeout);
    }

    return undefined;
  });
};

export const copiedState = atom({
  key: 'copied',
  default: false,
  effects_UNSTABLE: [
    copiedEffect(),
  ],
});

export default appState;

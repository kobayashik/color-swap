import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { colord, random } from 'colord';
import { Format } from 'colord/types';

import { parseInput } from '@/utils';
import { useOnClipboardAction } from '@/hooks';

interface ColorState {
  input: string;
  format: Format | undefined;
  rgb: string;
  hex: string;
  hsl: string;
}

type ColorActionTypes = 'SET_COLOR_INPUT';

interface ColorAction {
  type: ColorActionTypes;
  payload: string;
}

const RANDOM_COLOR = colord(random()).toRgbString();

const DEFAULT_COLOR_STATE: ColorState = parseInput(RANDOM_COLOR);

const colorReducer = (state: ColorState, action: ColorAction): ColorState => {
  switch (action.type) {
    case 'SET_COLOR_INPUT':
      return {
        ...state,
        ...parseInput(action.payload),
      };

    default:
      return state;
  }
};

interface ColorContextProps {
  state: ColorState;
  setColorInput: (value: string) => void;
}

export const ColorContext = createContext<ColorContextProps | undefined>(
  undefined
);

export const useColorContext = (): ColorContextProps => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return context;
};

export const ColorProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(colorReducer, DEFAULT_COLOR_STATE);

  const setColorInput = (value: string) => {
    dispatch({ type: 'SET_COLOR_INPUT', payload: value });
  };

  useOnClipboardAction({ onPaste: setColorInput });

  const value = {
    state,
    setColorInput,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

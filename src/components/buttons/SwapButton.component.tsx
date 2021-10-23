import React from 'react';
import { useRecoilState } from 'recoil';
import { SwitchHorizontalIcon } from '@heroicons/react/outline';

import { colorState } from '../../state';
import Button from './Button.component';

const SwapButton = () => {
  const [color, setColor] = useRecoilState(colorState);

  const onClick = () => {
    setColor(color);
  };

  return (
    <Button type="button" onClick={onClick}>
      <SwitchHorizontalIcon />
    </Button>
  );
};

export default SwapButton;

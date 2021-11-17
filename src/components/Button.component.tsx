import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ClipboardCopyIcon from '@heroicons/react/outline/ClipboardCopyIcon';
import SwitchHorizontalIcon from '@heroicons/react/outline/SwitchHorizontalIcon';

import { colorState, copiedState } from '../state';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0.5rem;
  margin: 0 0 0 1rem;
  border: none;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.buttonColor};
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 3px 7px 2px rgba(0, 0, 0, 0.2);

  &:not(:last-of-type) {
    margin: 0 0 0 1rem;
  }

  @media only screen and (max-width: 550px) {
    padding: 0.4rem;

    &:not(:last-of-type) {
      margin: 0 0 1rem 0;
    }
  }

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.buttonFocus};
  }

  &:active {
    background: ${({ theme }) => theme.primary};
  }
`;

export const CopyButton = () => {
  const setCopied = useSetRecoilState(copiedState);

  const onClick = () => {
    setCopied(true);
  };

  return (
    <Button type="button" name="copy" label="copy" onClick={onClick}>
      <ClipboardCopyIcon width="28" />
    </Button>
  );
};

export const SwapButton = () => {
  const [color, setColor] = useRecoilState(colorState);

  const onClick = () => {
    setColor(color);
  };

  return (
    <Button type="button" name="swap" label="swap" onClick={onClick}>
      <SwitchHorizontalIcon width="28" />
    </Button>
  );
};

export default Button;

import React from 'react';
import styled from 'styled-components';
import ClipboardCopyIcon from '@heroicons/react/outline/ClipboardCopyIcon';
import SwitchHorizontalIcon from '@heroicons/react/outline/SwitchHorizontalIcon';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0.5rem;
  border: none;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.buttonColor};
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 3px 7px 2px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 550px) {
    width: 100%;
  }

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.buttonFocus};
  }

  &:active {
    background: ${({ theme }) => theme.primary};
  }
`;

type Props = {
  onClick: () => void;
}

export const CopyButton = ({ onClick }: Props) => (
  <Button type="button" name="copy" label="copy" onClick={onClick}>
    <ClipboardCopyIcon width="28" />
  </Button>
);

export const SwapButton = ({ onClick }: Props) => (
  <Button type="button" name="swap" label="swap" onClick={onClick}>
    <SwitchHorizontalIcon width="28" />
  </Button>
);

export default Button;

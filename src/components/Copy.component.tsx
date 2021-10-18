import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import appState, { copiedState } from '../state';
import { getOpaqueContrastingColor } from '../utils';
import Clipboard from './Clipboard.component';

const Button = styled.button<{ color: string }>`
  position: absolute;
  top: 15%;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 4rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ color }) => getOpaqueContrastingColor(color)};
  background: ${({ color }) => color};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

  &:hover {
    cursor: pointer;
    color: ${({ color }) => color};
    background: ${({ color }) => getOpaqueContrastingColor(color)};
  }
`;

const CopyButton = () => {
  const state = useRecoilValue(appState);
  const setCopied = useSetRecoilState(copiedState);

  return (
    <Button color={state.color} onClick={() => setCopied(true)}>
      <Clipboard />
    </Button>
  );
};

export default CopyButton;

import React, { createRef, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { colorState, copiedState } from '../state';
import CopyButton from './buttons/CopyButton.component';
import SwapButton from './buttons/SwapButton.component';

const Actions = styled.div`
  display: flex;
  margin-top: 1rem;

  @media only screen and (max-width: 550px) {
    flex-direction: column;
  }
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid ${({ theme }) => theme.border};
  padding: 10px 20px;
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
  outline: none;
  box-shadow: 0 3px 7px 2px rgba(0, 0, 0, 0.2);

  &:focus {
    background-color: ${({ theme }) => theme.inputBackgroundFocus};
    color: ${({ theme }) => theme.inputColorFocus};
    border-color: ${({ theme }) => theme.inputBorderFocus};
  }

  @media only screen and (max-width: 550px) {
    max-width: 300px;
    font-size: 1.7rem;
  }
`;

export const Input = () => {
  const colorInput = createRef<HTMLInputElement>();
  const [color, setColor] = useRecoilState(colorState);
  const copied = useRecoilValue(copiedState);
  const [tempColor, setTempColor] = useState(color);

  useEffect(() => {
    if (copied) {
      colorInput?.current?.select();
    }
  }, [copied]);

  useEffect(() => {
    setTempColor(color);
  }, [color]);

  const onKeyDown = (event: { key: string, target: HTMLInputElement }) => {
    if (event.key === 'Enter') {
      const newColor = event.target.value;
      setColor(newColor);
    }
  };

  const onChange = ({ target: { value } }) => {
    setTempColor(value);
  };

  const onPaste = (e: ClipboardEvent) => e.preventDefault();

  return (
    <>
      <StyledInput
        onPaste={onPaste}
        ref={colorInput}
        value={tempColor}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />

      <Actions>
        <CopyButton />
        <SwapButton />
      </Actions>
    </>
  );
};

export default Input;

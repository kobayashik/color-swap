import React, { createRef, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { colorState, copiedState } from '../state';

const StyledInput = styled.input<{ width: number }>`
  width: ${({ width }) => width}ch;
  background-color: transparent;
  color: ${({ theme }) => theme.input};
  padding: 0 0.6rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  border: none;
  outline: none;
  transition: width 0.3s cubic-bezier(0.215, 0.610, 0.355, 1);

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

  const getInputWidth = () => Math.max(tempColor
    .replaceAll(/[\s,]/g, '')
    .length, 4);

  return (
    <StyledInput
      onPaste={onPaste}
      ref={colorInput}
      value={tempColor}
      onKeyDown={onKeyDown}
      onChange={onChange}
      width={getInputWidth()}
    />
  );
};

export default Input;

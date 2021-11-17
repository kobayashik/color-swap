import React, { createRef, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { colorState, copiedState } from '../state';

const StyledInput = styled.input<{ width: number }>`
  max-width: 350px;
  width: ${({ width }) => width * 1.5}rem;
  background-color: transparent;
  color: ${({ theme }) => theme.input};
  padding: 0 0.6rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  border: none;
  outline: none;
  transition: width 0.3s cubic-bezier(0.215, 0.610, 0.355, 1);
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
    .replaceAll(/[\s,()]/g, '')
    .length, 4);

  return (
    <StyledInput
      label="color"
      width={getInputWidth()}
      maxLength={24}
      ref={colorInput}
      value={tempColor}
      onPaste={onPaste}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
};

export default Input;

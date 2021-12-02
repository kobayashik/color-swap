import React, {
  forwardRef, useEffect, useState,
} from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { colorState } from '../state';

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

const calculateWidth = (value: string) => Math.max(value.replaceAll(/[\s,()]/g, '').length, 4);

export const Input = forwardRef((props, ref) => {
  const [color, setColor] = useRecoilState(colorState);
  const [tempColor, setTempColor] = useState(color);

  useEffect(() => {
    setTempColor(color);
  }, [color]);

  const onKeyDown = (event: { key: string, target: HTMLInputElement }) => {
    if (event.key === 'Enter') {
      setColor(event.target.value);
    }
  };

  const onChange = ({ target: { value } }) => {
    const validCharacters = /[^r|g|b|a(,;#.0-9A-Fa-f\s]/g;
    setTempColor(value?.replaceAll(validCharacters, ''));
  };

  const onPaste = (e: ClipboardEvent) => e.preventDefault();

  return (
    <StyledInput
      label="color"
      width={calculateWidth(tempColor)}
      maxLength={24}
      ref={ref}
      value={tempColor}
      onPaste={onPaste}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
});

export default Input;

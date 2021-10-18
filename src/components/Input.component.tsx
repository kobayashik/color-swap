import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getContrastingColor, getOpaqueContrastingColor } from '../utils';
import { CopyButton } from './Copy.component';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`;

export const StyledInput = styled.input`
  background-color: ${({ color }) => getContrastingColor(color)};
  color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid ${({ color }) => getContrastingColor(color)};
  max-width: 610px;
  padding: 10px 20px;
  font-size: 3.5rem;
  font-weight: bold;
  outline:none;

  &:focus {
    border-color: ${({ color }) => (color)};
  }
`;

export const Preview = styled.div<{ color: string }>`
  position: absolute;
  top: 15%;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 4rem;
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

type Props = {
  color: string;
  copied: boolean;
  onCopy: (copied: boolean) => void;
  // eslint-disable-next-line
  setColor: (color: string) => void;
}

export const Input = ({
  color, setColor, copied, onCopy,
}: Props) => {
  const colorInput = createRef<HTMLInputElement>();
  const [inputColor, setInputColor] = useState(color);

  useEffect(() => {
    if (copied && colorInput.current) {
      colorInput.current.select();
    }
  }, [copied, colorInput]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setColor(event.target.value);
    }
  };

  const onChange = (event) => setInputColor(event.target.value);

  return (
    <Wrapper>
      <StyledInput
        ref={colorInput}
        color={color}
        value={inputColor}
        onKeyDown={handleKeyDown}
        onChange={onChange}
      />
      <CopyButton color={color} onCopy={onCopy} />
    </Wrapper>
  );
};

export default Input;

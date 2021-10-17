import React, { createRef, useEffect, useState } from 'react';
import Color from 'color';
import styled from 'styled-components';

const getContrastingColor = (color: string) => {
  try {
    const initial = Color(color);
    const lightness = initial.lightness();
    const darkened = initial.darken(0.1).fade(0.6).string();
    const lightened = initial.lightness(lightness + 80).fade(0.8).string();

    return initial.isLight() ? darkened : lightened;
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`;

export const StyledInput = styled.input`
  background-color: ${({ color }) => getContrastingColor(color)};
  color: ${({ color }) => color};
  border-radius: 16px;
  border: 2px solid ${({ color }) => getContrastingColor(color)};
  /* border: transparent; */
  max-width: 610px;
  padding: 10px 20px;
  font-size: 3.5rem;
  font-weight: 500;

  outline:none;

  &:focus {
    border-color: ${({ color }) => (color)};
  }
`;

export const Preview = styled.div<{ color: string }>`
  position: absolute;
  top: 13%;
  right: 12px;
  height: 4rem;
  width: 4rem;
  border-radius: 16px;
  background: ${({ color }) => color};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;

type Props = {
  color: string;
  copied: boolean;
  setColor: (color: string) => void;
}

export const Input = ({ color, setColor, copied }: Props) => {
  const colorInput = createRef<HTMLInputElement>();
  const [inputColor, setInputColor] = useState(color);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setColor(event.target.value);
    }
  };

  const onChange = (event) => setInputColor(event.target.value);

  useEffect(() => {
    if (copied && colorInput.current) {
      colorInput.current.select();
    }
  }, [copied, colorInput]);

  return (
    <Wrapper>
      <div>
        <StyledInput
          ref={colorInput}
          color={color}
          value={inputColor}
          onKeyDown={handleKeyDown}
          onChange={onChange}
        />
        <Preview color={color} />
      </div>
    </Wrapper>
  );
};

export default Input;

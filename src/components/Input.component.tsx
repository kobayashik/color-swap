import React, { createRef, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { colorState, copiedState } from '../state';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: rgba(33, 35, 38, 0.1) 0 10px 10px -10px;
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.input};
  color: ${({ theme }) => theme.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.primary};
  max-width: 610px;
  padding: 10px 20px;
  font-size: 3.5rem;
  font-weight: bold;
  outline:none;
  box-shadow: 0 3px 7px 2px rgba(0, 0, 0, 0.2);

  &:focus {
    border-color: ${({ theme }) => theme.primary};
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

  return (
    <Wrapper>
      <StyledInput
        ref={colorInput}
        value={tempColor}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export default Input;

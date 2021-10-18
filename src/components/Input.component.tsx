import React, { createRef, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import appState, { copiedState } from '../state';
import { getContrastingColor, swapColor } from '../utils';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`;

const StyledInput = styled.input`
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

export const Input = () => {
  const colorInput = createRef<HTMLInputElement>();
  const [state, setState] = useRecoilState(appState);
  const setCopied = useSetRecoilState(copiedState);
  const [tempColor, setTempColor] = useState(state.color);

  useEffect(() => {
    setTempColor(state.color);
  }, [state]);

  useEffect(() => {
    async function selectInput(event) {
      event.preventDefault();
      colorInput?.current?.select();
      setCopied(true);
    }

    window.addEventListener('copy', selectInput);
    return () => window.removeEventListener('copy', selectInput);
  }, [colorInput]);

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      const swapped = swapColor(event.target.value, state.color);
      setState(swapped);
    }
  };

  const onChange = ({ target: { value } }) => setTempColor(value);

  return (
    <Wrapper>
      <StyledInput
        ref={colorInput}
        color={state.color}
        value={tempColor}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
    </Wrapper>
  );
};

export default Input;

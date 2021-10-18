import React from 'react';
import styled from 'styled-components';

export const StyledInstructions = styled.div`
  margin-top: 0.5rem;
  font-weight: 500;
  color: #fff9;
`;

export const Instructions = () => <StyledInstructions>Paste to convert color</StyledInstructions>;

export default Instructions;

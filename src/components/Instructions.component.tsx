import React from 'react';
import styled from 'styled-components';

export const StyledInstructions = styled.div`
  margin-top: 0.7rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.secondary};
`;

export const Instructions = () => <StyledInstructions>Paste to convert color</StyledInstructions>;

export default Instructions;

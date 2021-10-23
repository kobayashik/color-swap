import React from 'react';
import styled from 'styled-components';

const StyledError = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 3rem;
  font-weight: bold;
`;

export const Error = () => <StyledError>Could not convert color, try again?</StyledError>;

export default Error;

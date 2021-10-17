import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: lightcoral;
`;

export const Error = () => <Wrapper>Could not convert color, try again?</Wrapper>;

export default Error;

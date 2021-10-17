import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.p`
  color: lightcoral;
  font-size: 3rem;
  font-weight: bold;
`;

export const Error = () => <Wrapper>Could not convert color, try again?</Wrapper>;

export default Error;

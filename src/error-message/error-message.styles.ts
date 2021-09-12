import styled from 'styled-components';

export const Error = styled.p`
  font-size: '3rem';
  font-weight: 'bold';
  color: ${({ theme }) => theme.error}
`;

export default Error;

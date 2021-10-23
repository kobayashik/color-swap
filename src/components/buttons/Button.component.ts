import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 4rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.input};
  background: ${({ theme }) => theme.primary};
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px 0, rgba(0, 0, 0, 0.1) 0 0 1px 0;

  &:not(:last-of-type) {
    margin-right: 16px;
  }

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.focus};
  }
`;

export default Button;

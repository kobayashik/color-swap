import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0.7rem 1.5rem;
  border: none;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.buttonColor};
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 3px 7px 2px rgba(0, 0, 0, 0.2);

  &:not(:last-of-type) {
    margin: 0 1rem 0 0;
  }

  @media only screen and (max-width: 550px) {
    padding: 0.4rem;

    &:not(:last-of-type) {
      margin: 0 0 1rem 0;
    }
  }

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.buttonFocus};
  }

  &:active {
    background: ${({ theme }) => theme.primary};
  }
`;

export default Button;

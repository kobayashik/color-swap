import { createGlobalStyle } from 'styled-components';

export const darkTheme = {
  error: '#F87171',
  body: '#222831',
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body}
  }
`;

export default darkTheme;

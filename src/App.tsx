import React, { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';

import { Input, Instructions } from './components';
import { appThemeState, colorState, copiedState } from './state';
import Tooltip from './components/Tooltip.component';
import { CopyButton, SwapButton } from './components/Button.component';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const RelativeContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  background-color: #fff;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.6rem;
  box-shadow: 0 3px 7px 2px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 550px) {
    flex-direction: column;
  }
`;

const ButtonContainer = styled.div``;

function App() {
  const appTheme = useRecoilValue(appThemeState);
  const setCopied = useSetRecoilState(copiedState);
  const setColor = useSetRecoilState(colorState);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(inputRef.current?.value || '');
      setCopied(true);
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    if (e.clipboardData) {
      const text = e.clipboardData.getData('text');
      setColor(text);
    }
  };

  const handleSwap = () => {
    if (inputRef.current) {
      setColor(inputRef.current.value);
    }
  };

  useEffect(() => {
    window.addEventListener('copy', handleCopy);
    return () => window.removeEventListener('copy', handleCopy);
  }, []);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <Wrapper>
        <RelativeContainer>
          <Tooltip />
          <Input ref={inputRef} />
          <ButtonContainer>
            <CopyButton onClick={handleCopy} />
          </ButtonContainer>
          <ButtonContainer>
            <SwapButton onClick={handleSwap} />
          </ButtonContainer>
        </RelativeContainer>
        <Instructions />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

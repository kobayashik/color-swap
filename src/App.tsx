import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';

import { Input, Instructions } from './components';
import { appThemeState, colorState, copiedState } from './state';
import Tooltip from './components/Tooltip.component';
import CopyButton from './components/buttons/CopyButton.component';
import SwapButton from './components/buttons/SwapButton.component';

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
  position: relative;
  background-color: ${({ theme }) => theme.inputBackground};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.6rem;
  box-shadow: 0 3px 7px 2px rgba(0, 0, 0, 0.2);
`;

function App() {
  const appTheme = useRecoilValue(appThemeState);
  const setCopied = useSetRecoilState(copiedState);
  const setColor = useSetRecoilState(colorState);

  useEffect(() => {
    const handleCopyEvent = async (event: ClipboardEvent) => {
      event.preventDefault();
      setCopied(true);
    };

    window.addEventListener('copy', handleCopyEvent);
    return () => window.removeEventListener('copy', handleCopyEvent);
  }, []);

  useEffect(() => {
    const handlePasteEvent = async (event: ClipboardEvent) => {
      if (event.clipboardData) {
        const newColor = event.clipboardData.getData('Text').trim();
        setColor(newColor);
      }
    };

    window.addEventListener('paste', handlePasteEvent);
    return () => window.removeEventListener('paste', handlePasteEvent);
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <Wrapper>
        <RelativeContainer>
          <Tooltip />
          <Input />
          <CopyButton />
          <SwapButton />
        </RelativeContainer>
        <Instructions />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

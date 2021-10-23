import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';

import { Error, Input, Instructions } from './components';
import CopyButton from './components/buttons/CopyButton.component';
import {
  appThemeState, colorState, copiedState, errorState,
} from './state';
import Tooltip from './components/Tooltip.component';
import SwapButton from './components/buttons/SwapButton.component';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.primary};
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const Actions = styled(RelativeContainer)`
  position: absolute;
  top: 12px;
  right: 16px;
  display: flex;
`;

function App() {
  const error = useRecoilValue(errorState);
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
          <RelativeContainer>
            <Input />
            <Actions>
              <CopyButton />
              <SwapButton />
            </Actions>
          </RelativeContainer>
        </RelativeContainer>
        {error && <Error />}
        <Instructions />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

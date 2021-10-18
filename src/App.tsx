import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import Tooltip from './tooltip/tooltip.component';
import { swapColor } from './utils/utils';
import { Input, Error, Instructions } from './components';
import colorState, { copiedState } from './state';
import CopyButton from './components/Copy.component';

const Wrapper = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  /* background-color: ${({ color }) => color}; */
`;

const RelativeContainer = styled.div`
  position: relative;
`;

function App() {
  const [state, setState] = useRecoilState(colorState);
  const copied = useRecoilValue(copiedState);

  async function copyToClipboard(text: string) {
    try {
      setState((oldState) => ({ ...oldState, error: '' }));
      await navigator.clipboard.writeText(text);
    } catch (err) {
      setState((oldState) => ({
        ...oldState,
        error: 'Error copying from Clipboard',
      }));
    }
  }

  useEffect(() => {
    async function handleSetColorOnPaste(event: ClipboardEvent) {
      if (event.clipboardData) {
        const data = event.clipboardData.getData('Text').trim();
        const newState = swapColor(data, state.color);
        setState(newState);
      }
    }

    window.addEventListener('paste', handleSetColorOnPaste);
    return () => window.removeEventListener('paste', handleSetColorOnPaste);
  }, []);

  useEffect(() => {
    async function handleCopyColorToClipboard(event) {
      event.preventDefault();
      copyToClipboard(state.color);
    }

    window.addEventListener('copy', handleCopyColorToClipboard);
    return () => window.removeEventListener('copy', handleCopyColorToClipboard);
  }, [state]);

  return (
    <Wrapper color={state.color}>
      <RelativeContainer>
        <Tooltip active={copied} />
        <RelativeContainer>
          <Input />
          <CopyButton />
        </RelativeContainer>
      </RelativeContainer>
      {state?.error && <Error />}
      <Instructions />
    </Wrapper>
  );
}

export default App;

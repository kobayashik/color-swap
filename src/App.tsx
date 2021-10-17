import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Color from 'color';

import Tooltip from './tooltip/tooltip.component';
import { convertColorToHex, convertColorToRGB } from './utils/utils';
import { Input, Error, Instructions } from './components';

const Wrapper = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  /* background-color: ${({ color }) => color}; */
`;

const InputWrapper = styled.div`
  position: relative;
`;

function App() {
  function getRandomColor() {
    const STARTING_COLORS: string[] = ['#c9f4fe', 'rgb(201, 244, 254)', '#b2f1d8', 'rgb(178, 241, 216)', '#fffee3', 'rgb(255, 254, 227)', '#ffb3c8', 'rgb(255, 179, 200)'];
    return STARTING_COLORS[Math.floor(Math.random() * STARTING_COLORS.length)];
  }

  const [color, setColor] = useState<string>(getRandomColor());
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      setError('Error copying from Clipboard');
    }
  }

  useEffect(() => {
    async function handleSetColorOnPaste(event: ClipboardEvent) {
      const HEX_REGEX = /#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gi;

      if (event.clipboardData) {
        const data = event.clipboardData.getData('Text').trim();
        try {
          let convertedColor = '';
          if (HEX_REGEX.test(data)) {
            convertedColor = convertColorToRGB(data);
          } else {
            convertedColor = convertColorToHex(data);
          }

          // copyToClipboard(convertedColor);
          setColor(convertedColor);
          setError('');
        } catch (err) {
          setError('Could not parse color :(');
        }
      }
    }

    window.addEventListener('paste', handleSetColorOnPaste);
    return () => window.removeEventListener('paste', handleSetColorOnPaste);
  }, [setColor, setError]);

  useEffect(() => {
    async function handleCopyColorToClipboard(event) {
      event.preventDefault();
      copyToClipboard(color);
    }

    window.addEventListener('copy', handleCopyColorToClipboard);
    return () => window.removeEventListener('copy', handleCopyColorToClipboard);
  }, [color]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) { setCopied(false); }
    }, 500);

    return () => clearTimeout(timeout);
  }, [copied]);

  const onSetColor = (newColor: string) => {
    try {
      setError('');
      const parsed = Color(newColor);

      setColor(parsed.toString());
    } catch (err) {
      setError('Invalid Color');
    }
  };

  return (
    <Wrapper color={color}>
      <InputWrapper>
        <Tooltip active={copied} />
        <Input copied={copied} color={color} setColor={onSetColor} />
      </InputWrapper>
      {error && <Error />}
      <Instructions />
    </Wrapper>
  );
}

export default App;

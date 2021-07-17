import React, { useEffect, useState } from 'react';
import Color from './color/Color';
import Instructions from './instructions/Instructions';
import Tooltip from './tooltip/Tooltip';
import { convertColorToHex, convertColorToRGB } from './utils/utils';

function App() {
  const [color, setColor] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const STARTING_COLORS: string[] = ['#c9f4fe', 'rgb(201, 244, 254)', '#b2f1d8', 'rgb(178, 241, 216)', '#fffee3', 'rgb(255, 254, 227)', '#ffb3c8', 'rgb(255, 179, 200)'];
    const startingColor = STARTING_COLORS[Math.floor(Math.random() * STARTING_COLORS.length)];
    setColor(startingColor);
  }, []);

  useEffect(() => {
    async function handleSetColorOnPaste(event: ClipboardEvent) {
      const HEX_REGEX = /#?([a-fA-F0-9]{8}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/gi;

      if (event.clipboardData) {
        const data = event.clipboardData.getData('Text').trim();
        try {
          if (HEX_REGEX.test(data)) {
            setColor(convertColorToRGB(data));
          } else {
            setColor(convertColorToHex(data));
          }
        } catch (err) {
          setError('Could not parse color :(');
        }
      }
    }

    window.addEventListener('paste', handleSetColorOnPaste);
    return () => window.removeEventListener('paste', handleSetColorOnPaste);
  }, [setColor]);

  useEffect(() => {
    async function handleCopyColorToClipboard(event) {
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(color);
        setCopied(true);
      } catch (err) {
        setError('Error copying from Clipboard');
      }
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

  return (
    <div style={{ position: 'relative' }}>
      {error}
      <Tooltip active={copied} />
      <Color color={color} copied={copied} />
      <Instructions />
    </div>
  );
}

export default App;

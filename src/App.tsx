import React, { useEffect, useState } from 'react';
import Color from './color/Color';
import Instructions from './instructions/Instructions';
import Tooltip from './tooltip/Tooltip';
import { isHexColor, toHex, toRGB } from './utils/utils';

function App() {
  const RANDOM_STARTING_COLORS: string[] = ["#c9f4fe", "rgb(201, 244, 254)", "#b2f1d8", "rgb(178, 241, 216)", "#fffee3", "rgb(255, 254, 227)", "#ffb3c8", "rgb(255, 179, 200)"];
  const [outputColor, setColor] = useState(RANDOM_STARTING_COLORS[Math.floor(Math.random() * RANDOM_STARTING_COLORS.length)])
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>('')

  useEffect(() => {
    function handlePasteColor(event: ClipboardEvent) {
      const data = event.clipboardData?.getData('Text').trim();
      if (data) {
        try {
          const color = isHexColor(data) ? toRGB(data) : toHex(data)
          setColor(color)

        } catch (e) {
          console.log('error')
        }
      }
    }

    window.addEventListener('paste', handlePasteColor);
    return () => window.removeEventListener('paste', handlePasteColor);
  }, [outputColor, setColor]);

  useEffect(() => {
    async function handleCopyWindowEvent(event) {
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(outputColor);
      } catch (err) {
        setError('Error copying from Clipboard');
      }
    }

    window.addEventListener('copy', handleCopyWindowEvent);
    return () => window.removeEventListener('copy', handleCopyWindowEvent);
  }, [outputColor]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) { setCopied(false) }
    }, 500);

    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div style={{ 'position': 'relative' }}>
      <Tooltip active={copied} />
      <Color color={outputColor} copied={copied} setCopied={setCopied} />
      <Instructions />
    </div>
  );
}

export default App;

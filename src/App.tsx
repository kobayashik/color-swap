import React, { useEffect, useState } from 'react';
import Color from './color/Color';
import Instructions from './instructions/Instructions';
import Tooltip from './tooltip/Tooltip';
import { isHexColor, toHex, toRGB } from './utils/utils';

function App() {
  const RANDOM_STARTING_COLORS: string[] = ["#c9f4fe", "rgb(201, 244, 254)", "#b2f1d8", "rgb(178, 241, 216)", "#fffee3", "rgb(255, 254, 227)", "#ffb3c8", "rgb(255, 179, 200)"];
  const [outputColor, setColor] = useState(RANDOM_STARTING_COLORS[Math.floor(Math.random() * RANDOM_STARTING_COLORS.length)])
  const [copied, setCopied] = useState(false);

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
    function handleCopyColor(event) {
      event.preventDefault();
      navigator.clipboard.writeText(outputColor)
        .then(
          () => { setCopied(true) },
          (err) => console.log(err)
        );
    }

    window.addEventListener('copy', handleCopyColor);
    return () => window.removeEventListener('copy', handleCopyColor);
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

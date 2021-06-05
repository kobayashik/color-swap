import React, { useEffect, useState } from 'react';
import Color from './color/Color';
import Instructions from './instructions/Instructions';
import { fromString } from "css-color-converter";


function App() {
  const RANDOM_STARTING_COLORS: string[] = ["#c9f4fe", "rgb(201, 244, 254)", "#b2f1d8", "rgb(178, 241, 216)", "#fffee3", "rgb(255, 254, 227)", "#ffb3c8", "rgb(255, 179, 200)"];
  const [color, setColor] = useState('#c9f4fe')
  const [copied, setCopied] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    function handlePasteColor(event: ClipboardEvent) {
      const _color = event.clipboardData?.getData('Text');
      if (_color) {
        const isHex = /#?([a-fA-F0-9]{3,6,8})$/gi.test(color);
        setColor(isHex ? fromString(_color).toRgbString() : fromString(_color).toHexString());
      }
    }

    window.addEventListener('paste', handlePasteColor);
    return () => window.removeEventListener('paste', handlePasteColor);
  }, [color]);

  useEffect(() => {
    function handleCopyColor() {
      navigator.clipboard.writeText(color)
        .then(
          () => { setCopied(true)},
          (err) => console.log(err)
        );
    }

    window.addEventListener('copy', handleCopyColor);
    return () => window.removeEventListener('copy', handleCopyColor);
  }, []);


  const [fade, setFade] = useState<string | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (fade === 'fade-in') {
        setFade('fade-out')
      } else if (fade === 'fade-out') {
        setFade('fade-in')
      }
    }, 3000);

    return () => clearTimeout(timeout)
  }, [isActive, setIsActive])

  return (
    <div style={{ 'position': 'relative' }}>
      <p className={'tooltip ' + 'fade-in'}>Copied!</p>
      <Color color={color} copied={copied} setCopied={setCopied}/>
      <Instructions />
    </div>
  );
}

export default App;

import { MaskedRange } from 'imask';
import React, { createRef, useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { convertColorToHex, convertColorToRGB } from '../utils/utils';

import style from './color.module.scss';

const INPUT_MASK = [
  {
    mask: 'r[gb]'
  },
  {
    mask: 'rgb(RGB,RGB,RGB)',
    blocks: {
      'RGB': {
        mask: Number,
        scale: 0,
        signed: false,
        padFractionalZeros: false,
        normalizeZeros: false,
        min: 1,
        max: 255
      },
    }
  },
  {
    mask: 'rgb\\a(RGB,RGB,RGB,ALPHA)',
    blocks: {
      'ALPHA': {
        mask: Number,
        scale: 1,
        radix: ".",
        signed: false,
        min: 0,
        max: 1,
        lazy: true
      },
      'RGB': {
        mask: Number,
        scale: 0,
        signed: false,
        padFractionalZeros: false,
        normalizeZeros: false,
        min: 1,
        max: 255
      },
    }
  },
  {
    mask: /^#[0-9a-f]{0,8}$/i
  }
]

type ColorProps = {
  color: string;
  copied: boolean;
}

const Color = ({ copied }: ColorProps) => {
  const colorInput = createRef<HTMLInputElement>();

  const [color, setColor] = useState('');


  // useEffect(() => {
  //   if (copied && colorInput.current) {
  //     colorInput.current.select();
  //   }
  // }, [copied, colorInput]);

  return (
    <>
      {/* <input ref={colorInput} className={style.color} style={{ color }} readOnly value={color} /> */}
      <IMaskInput
        mask={INPUT_MASK}
        value={color}
        unmask={'typed'}
        overwrite={false}
        onAccept={
          // depending on prop above first argument is
          // `value` if `unmask=false`,
          // `unmaskedValue` if `unmask=true`,
          // `typedValue` if `unmask='typed'`
          (value, mask) => {
            setColor(value)
            // console.log(value)
          }
        }
        // ...and more mask props in a guide

        // input props also available
        placeholder='Enter number here'
      />

      <div style={{ color }}>color</div>
    </>
  );
};

export default Color;
function copyToClipboard(convertedColor: string) {
  throw new Error('Function not implemented.');
}


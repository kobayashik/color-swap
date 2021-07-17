import React, { createRef, useEffect } from 'react';
import style from './color.module.scss';

type ColorProps = {
  color: string;
  copied: boolean;
}

const Color = ({ color, copied }: ColorProps) => {
  const colorInput = createRef<HTMLInputElement>();

  useEffect(() => {
    if (copied && colorInput.current) {
      colorInput.current.select();
    }
  }, [copied, colorInput]);

  return (
    <input ref={colorInput} className={style.color} style={{ color }} readOnly value={color} />
  );
};

export default Color;

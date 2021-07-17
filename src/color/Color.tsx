import React, { createRef, useEffect } from 'react';

type ColorProps = {
  color: string;
  copied: boolean;
}

const Color: React.FC<ColorProps> = ({ color, copied }: ColorProps) => {
  const colorInput = createRef<HTMLInputElement>();

  useEffect(() => {
    if (copied && colorInput.current) {
      colorInput.current.select();
    }
  }, [copied, colorInput]);

  return (
    <input ref={colorInput} className="color" style={{ color }} readOnly value={color} />
  );
};

export default Color;

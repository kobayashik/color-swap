import React, { useEffect, createRef, MouseEventHandler } from 'react';

type ColorProps = {
  color: string;
  copied: boolean;
  setCopied: (copied: boolean) => void
}

const Color: React.FC<ColorProps> = ({ color, copied, setCopied }: ColorProps) => {
  const colorInput = createRef<HTMLInputElement>()

  function handleDoubleClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    event.stopPropagation()

    return false;
  }


  useEffect(() => {
    if (copied && colorInput.current) {
      console.log("updared")
      colorInput.current.select()
    }
  }, [copied, colorInput])

  return (
    <input ref={colorInput} onDoubleClick={(event) => handleDoubleClick(event)} className="color" style={{ color }} readOnly value={color} />
  )
}

export default Color;
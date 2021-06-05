import React, { useEffect, createRef, MouseEventHandler } from 'react';

type ColorProps = {
  color: string;
  copied: boolean;
  setCopied: (copied: boolean) => void
}

const Color: React.FC<ColorProps> = ({color, copied, setCopied}: ColorProps) => {
  const myRef = createRef<HTMLInputElement>()

  function handleDoubleClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    event.preventDefault()

    return false;
  }


useEffect(() => {
  if(copied) {
    if(myRef && myRef.current) {
      myRef.current.select()
    }
  }
}, [copied, myRef])

  return (
    <input ref={myRef} onDoubleClick={(event) => handleDoubleClick(event)} className="color" style={{ color }} defaultValue={color} />
  )
}

export default Color;
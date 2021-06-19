import React, { useEffect, createRef, MouseEventHandler } from 'react';

type ColorProps = {
  color: string;
  copied: boolean;
  setCopied: (copied: boolean) => void
}

const Color: React.FC<ColorProps> = ({color, copied, setCopied}: ColorProps) => {
  const myRef = createRef<HTMLInputElement>()

  function handleDoubleClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    event.stopPropagation()

    return false;
  }


useEffect(() => {
  if(copied) {
    console.log("copied")
    if(myRef && myRef.current) {
      myRef.current.select()

      console.log(myRef.current.value)
    }
  }
}, [copied])

  return (
    <input ref={myRef} onDoubleClick={(event) => handleDoubleClick(event)} className="color" style={{ color }} readOnly value={color} />
  )
}

export default Color;
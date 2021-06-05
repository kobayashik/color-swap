import React, { useEffect } from 'react';

const Instructions: React.FC<{}> = () => {
  const useMacBindings = navigator.platform.toLowerCase().includes('mac')

  function getCopyKeybindings() {
    return (
    <>
      {useMacBindings ? <kbd>CMD</kbd> : (<kbd>CTRL</kbd>)} + <kbd>C</kbd> to copy color
    </>);
  }

  function getPasteKeybindings() {
    return (
    <>
      {useMacBindings ? <kbd>CMD</kbd> : (<kbd>CTRL</kbd>)} + <kbd>V</kbd> to convert color
    </>);
  }

  return (
    <div className="instructions">
      <div>
        <p>Paste to convert from HEX to RGB</p>
        <p>{ getCopyKeybindings() }</p>
        <p>{ getPasteKeybindings() }</p>
      </div>
    </div>
  )
}

export default Instructions;
import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';

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

  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(!isActive);

    }, 1000)

    return (() => clearInterval(interval))

  }, [isActive, setIsActive])

  // /'slide-fade-enter-active slide-fade-leave-to'


  function fadeInTransition() {

  }

  function fadeOutTransition() {
    // {
      
       
    //    ) }
  }


  return (
    <div className="instructions">
      <div>
        <p style={{ 'marginBottom': '10px' }}>
        


        <div>
          <span className={ (isActive ? 'slide-fade-leave-active' : 'slide-fade-enter-active slide-fade-leave-to') }><strong>HEX</strong> to <strong>RGB</strong></span>
          <span className={(!isActive ? 'slide-fade-leave-active' : 'slide-fade-enter-active slide-fade-leave-to')}><strong>RGB</strong> to <strong>HEX</strong></span>

          </div>

          {/* <div className={(isActive ? 'slide-fade-leave-active' : 'slide-fade-enter-active slide-fade-leave-to')}><strong>HEX</strong> to <strong>RGB</strong></div>
          <div className={(!isActive ? 'slide-fade-leave-active' : 'slide-fade-enter-active slide-fade-leave-to')}><strong>RGB</strong> to <strong>HEX</strong></div> */}

        </p>
        <p>{ getCopyKeybindings() }</p>
        <p>{ getPasteKeybindings() }</p>
      </div>
    </div>
  )
}

export default Instructions;
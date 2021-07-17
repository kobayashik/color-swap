/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import styles from './instructions.module.scss';

const Instructions = () => {
  const isMac = navigator.platform.toLowerCase().includes('mac');
  const [flipped, setFlipped] = useState(true);

  useEffect(() => {
    setFlipped(!flipped);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setFlipped((active: boolean) => !active), 2000);
    return (() => clearInterval(interval));
  }, [setFlipped]);

  function getOSModifierKey() {
    return (isMac ? <kbd>CMD</kbd> : (<kbd>CTRL</kbd>));
  }

  function getFlippingInstructions() {
    return (
      <ReactCardFlip isFlipped={flipped} infinite>
        <><strong>RGB</strong> to <strong>HEX</strong></>
        <><strong>HEX</strong> to <strong>RGB</strong></>
      </ReactCardFlip>
    );
  }

  return (
    <div className={styles.instructions}>
      <div>
        <div className={styles.instruction}>{getOSModifierKey()} + <kbd>C</kbd> to copy color </div>
        <div className={styles.instruction}>{getOSModifierKey()} + <kbd>V</kbd> to convert {getFlippingInstructions()}</div>
      </div>
    </div>
  );
};

export default Instructions;

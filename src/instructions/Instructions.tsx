import React, { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

const Instructions: React.FC<{}> = () => {
  const isMac = navigator.platform.toLowerCase().includes('mac');
  const [flipped, setFlipped] = useState(true);

  useEffect(() => {
    setFlipped(!flipped);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setFlipped((active) => !active), 2000);

    return (() => clearInterval(interval));
  }, [flipped, setFlipped]);

  return (
    <div className="instructions">
      <div>
        <p>
          {' '}
          {isMac ? <kbd>CMD</kbd> : (<kbd>CTRL</kbd>)}
          {' '}
          +
          {' '}
          <kbd>C</kbd>
          {' '}
          to copy color
        </p>
        <p>
          {' '}
          {isMac ? <kbd>CMD</kbd> : (<kbd>CTRL</kbd>)}
          {' '}
          +
          {' '}
          <kbd>V</kbd>
          {' '}
          to convert
          <ReactCardFlip
            isFlipped={flipped}
            flipDirection="horizontal"
            infinite
            flipSpeedBackToFront={1.5}
            flipSpeedFrontToBack={1.5}
          >
            <div>
              <strong>RGB</strong>
              {' '}
              to
              <strong>HEX</strong>
            </div>
            <div>
              <strong>HEX</strong>
              {' '}
              to
              <strong>RGB</strong>
            </div>
          </ReactCardFlip>

        </p>
      </div>
    </div>
  );
};

export default Instructions;

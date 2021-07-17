import React from 'react';

type TooltipProps = {
  active: boolean;
}

function Tooltip({ active }: TooltipProps) {
  return (<p className={`tooltip ${active ? 'fade-in' : 'fade-out'}`}>Copied!</p>);
}

export default Tooltip;

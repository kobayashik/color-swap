import React from 'react';

type TooltipProps = {
  active: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ active }: TooltipProps) => {
  return (<p className={`tooltip ${active ? 'fade-in' : 'fade-out'}`}>Copied!</p>);
}

export default Tooltip;

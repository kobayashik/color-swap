import React from 'react';

type TooltipProps = {
  active: boolean;
}

const Tooltip = ({ active }: TooltipProps) => (<p className={`tooltip ${active ? 'fade-in' : 'fade-out'}`}>Copied!</p>);

export default Tooltip;

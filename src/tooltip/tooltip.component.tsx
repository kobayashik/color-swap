import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { copiedState } from '../state';

type TooltipProps = {
  active: boolean;
}

const Tooltip = ({ active }: TooltipProps) => {
  const [copied, setCopied] = useRecoilState(copiedState);

  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 1000);

    return () => clearTimeout(timeout);
  }, [copied, setCopied]);

  return (<p className={`tooltip ${active ? 'fade-in' : 'fade-out'}`}>Copied!</p>
  );
};

export default Tooltip;

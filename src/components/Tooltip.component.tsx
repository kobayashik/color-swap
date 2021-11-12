import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { copiedState } from '../state';

const StyledTooltip = styled.p<{ active: boolean }>`
  position: absolute;
  bottom: 110%;
  left: 50%;
  z-index: 1;
  width: 150px;
  font-size: 1.5rem;
  text-align: center;
  padding: 5px 0;
  margin-left: -60px;
  color: #fff;
  background-color: #555;
  border-radius: 6px;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.4s ease;

  &:after {
    position: absolute;
    top: 100%;
    left: 50%;
    border-width: 10px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
    margin-left: -10px;
    content: "";
  }
`;

const Tooltip = () => {
  const copied = useRecoilValue(copiedState);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!copied && !active) return undefined;
    setActive(true);

    const timeout = setTimeout(() => setActive(false), 1000);
    return () => clearTimeout(timeout);
  }, [copied, active]);

  return (
    <StyledTooltip active={active}>Copied!</StyledTooltip>
  );
};

export default Tooltip;

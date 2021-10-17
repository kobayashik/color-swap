import React from 'react';
import styled from 'styled-components';
import { getOpaqueContrastingColor } from '../utils';

type IconProps = {
  height?: number;
  width?: number;
}

export const CopyIcon = ({ height, width }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
  </svg>
);

CopyIcon.defaultProps = {
  height: 48,
  width: 48,
};

export const Preview = styled.button<{ color: string }>`
  position: absolute;
  top: 15%;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 4rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ color }) => getOpaqueContrastingColor(color)};
  background: ${({ color }) => color};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

  &:hover {
    cursor: pointer;
    color: ${({ color }) => color};
    background: ${({ color }) => getOpaqueContrastingColor(color)};
  }
`;

type Props = {
  color: string;
  onCopy: (copied: boolean) => void;
}

export const CopyButton = ({ color, onCopy }: Props) => (
  <Preview color={color} onClick={() => onCopy(true)}>
    <CopyIcon />
  </Preview>
);

export default CopyButton;

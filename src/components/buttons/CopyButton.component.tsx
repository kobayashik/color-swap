import React from 'react';
import { useSetRecoilState } from 'recoil';
import { ClipboardCopyIcon } from '@heroicons/react/outline';

import { copiedState } from '../../state';
import Button from './Button.component';

const CopyButton = () => {
  const setCopied = useSetRecoilState(copiedState);

  const onClick = () => {
    setCopied(true);
  };

  return (
    <Button type="button" onClick={onClick}>
      <ClipboardCopyIcon width="36" />
    </Button>
  );
};

export default CopyButton;

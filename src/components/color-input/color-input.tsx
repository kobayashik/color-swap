import React, { ChangeEvent, useRef } from 'react';
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { ColorPreview } from '@/components/color-preview';
import { useColorContext } from '@/store';
import { useOnClipboardAction } from '@/hooks';

export const ColorInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { state, setColorInput } = useColorContext();

  const onPasteCaptured = () => {
    setColorInput('');
  };

  useOnClipboardAction({
    ref,
    onPaste: onPasteCaptured,
  });

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setColorInput(value);
  };

  return (
    <FormControl>
      <InputGroup size="lg">
        <InputLeftElement>
          <ColorPreview />
        </InputLeftElement>
        <Input
          type="text"
          ref={ref}
          value={state.input}
          placeholder="#000000"
          onPasteCapture={onPasteCaptured}
          onChange={onChange}
        />
      </InputGroup>
    </FormControl>
  );
};

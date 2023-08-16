import React from 'react';
import { RgbaStringColorPicker } from 'react-colorful';
import { Flex } from '@chakra-ui/react';

import { useColorContext } from '@/store';
import { ColorField } from '@/components/color-field';
import { ColorInput } from '@/components/color-input';
import { useDebouncedCallback } from '@/hooks';

import styles from './card.module.scss';

export const Card = () => {
  const { state, setColorInput } = useColorContext();

  const onChange = useDebouncedCallback(setColorInput);

  return (
    <Flex className={styles['card']} direction="column" gap={2}>
      <ColorInput />
      <RgbaStringColorPicker color={state.rgb} onChange={onChange} />

      <Flex direction="column" gap={2}>
        <ColorField label="HEX" value={state.hex} />
        <ColorField label="RGB" value={state.rgb} />
        <ColorField label="HSL" value={state.hsl} />
      </Flex>
    </Flex>
  );
};

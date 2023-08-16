import React from 'react';
import { Box } from '@chakra-ui/react';

import { useColorContext } from '@/store';

export const ColorPreview = () => {
  const { state } = useColorContext();

  return (
    <Box
      borderRadius="md"
      border="1px"
      borderColor="#000"
      backgroundColor={state.hsl}
    >
      <Box
        width="9"
        height="9"
        borderRadius="md"
        border="1px"
        borderColor="#fff"
        backgroundColor={state.hsl}
      />
    </Box>
  );
};

import React from 'react';
import { Center } from '@chakra-ui/react';

import './i18n';

import { Card } from './components/card';
import { ColorProvider } from './store';

function App() {
  return (
    <ColorProvider>
      <Center h="100vh" w="100vw">
        <Card />
      </Center>
    </ColorProvider>
  );
}

export default App;

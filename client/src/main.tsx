import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  ChakraProvider,
  extendTheme,
  Text,
  Tabs,
  theme,
} from '@chakra-ui/react';
import SocketProvider from './context/socketContext';

const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: 'green.700',
        _selected: {
          color: 'none',
          borderColor: 'white',
          bg: 'none',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </SocketProvider>
);

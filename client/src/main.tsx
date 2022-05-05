import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import SocketProvider from './context/socketContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </SocketProvider>
  </React.StrictMode>
);

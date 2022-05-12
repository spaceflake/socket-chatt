import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import SocketProvider from './context/socketContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <SocketProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </SocketProvider>
);

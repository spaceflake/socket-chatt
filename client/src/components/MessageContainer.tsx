import Form from './Form';
import { useContext, useEffect, useRef, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { SocketContext } from '../context/socketContext';

function MessageContainer() {
  const [Messages, setMessages] = useState<string[]>([]);
  const [writingMessage, setWritingMessage] = useState(true);
  const { socket, nickname, allRooms, joinedRoom } = useContext(SocketContext);

  useEffect(() => {
    // socket.on('chat message', (message) => {
    //   setMessages([...Messages, message])
    // })
    socket.on('connect', () => {
      console.log('connected');
    });
    // socket.on('roomList', (rooms) => {
    //   console.log(rooms);
    // });
  }, []);

  return (
    <Box height="100%" position="relative">
      <Box>
        <ul id="messages">
          <Heading textAlign="center">All messages in {joinedRoom}</Heading>
          {Messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </Box>
      <Box position="absolute" bottom={0} w="100%">
        <Form {...{ setWritingMessage }} />
      </Box>
    </Box>
  );
}

export default MessageContainer;

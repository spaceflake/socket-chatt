import Form from './Form';
import { useContext, useEffect, useState } from 'react';
import { Message } from '../../../types';

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import { SocketContext } from '../context/socketContext';
import communication from '../assets/com.png';

function MessageContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [writingMessage, setWritingMessage] = useState(false);
  const { socket, nickname, allRooms, joinedRoom, chatMessages } =
    useContext(SocketContext);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!creatingRoom) {
      onClose();
    }
  }, [creatingRoom]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, [socket]);

  const handleSendMessage = () => {
    socket.emit('message', message, joinedRoom);
    setMessage('');
  };

  return (
    <Box h="100%" className="scrollBox" position="relative" bg="rgba(255,255,255, 0.5)">
      {!joinedRoom ? (
        <Flex
          direction="column"
          align="center"
          height="100%"
          justify="center"
          gap={10}
        >
          <Image w="50%" src={communication} />
          <Heading>You have not joined a room yet</Heading>
          <Text fontSize="2xl" align="center">
            Either join a room <br />
            or <br />
            <Button
              onClick={() => {
                onOpen();
                setCreatingRoom(true);
              }}
            >
              Create a room
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Name your room</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Form {...{ setCreatingRoom, creatingRoom }} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Text>
        </Flex>
      ) : (
        <>
          <Box>
            <Heading textAlign="center">All messages in {joinedRoom}</Heading>
            {chatMessages && (
              <ul id="messages">
                {/* implement this in loop  (nickname should not just be nickname in future, to separate WHO wrote this?) */}
                {/* <li key={chatMessage}>
                {nickname} wrote: {chatMessage}
              </li> */}
                {messages.map((chatMessage, index) => (
                  <Box
                    key={index}
                    bg="#739099"
                    mt="1"
                    p="1.5"
                    w="fit-content"
                    borderRadius="md"
                  >
                    <Text bg="blackAlpha.500" color="gray.100">
                      From: {chatMessage.sender}
                    </Text>
                    <Text>{chatMessage.body}</Text>
                  </Box>
                ))}
              </ul>
            )}
          </Box>
          <Box position="absolute" bottom={0} w="100%">
            <Text>
              {nickname} has connected to {joinedRoom}
            </Text>
            <Text>{writingMessage && 'is writing'}</Text>
            <input
              type="text"
              placeholder="Enter Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage}>Send</Button>
            {/* <Form
              {...{ setWritingMessage, writingMessage, message, setMessage }}
            /> */}
          </Box>
        </>
      )}
    </Box>
  );
}

export default MessageContainer;

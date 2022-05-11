import Form from './Form';
import { useEffect, useRef, useState } from 'react';
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

import { useSocket } from '../context/socketContext';
import communication from '../assets/com.png';
import ChatForm from './ChatForm';

function MessageContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [writingMessage, setWritingMessage] = useState(false);
  const { socket, joinedRoom, chatMessages } = useSocket();
  const [creatingRoom, setCreatingRoom] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scrollBox = useRef<HTMLDivElement | null>(null);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    if (!creatingRoom) {
      onClose();
    }
  }, [creatingRoom]);

  useEffect(() => {
    console.log('switched room to: ' + joinedRoom);
  }, [joinedRoom]);

  useEffect(() => {
    // Receive room chat history
    socket.on('history', (messages) => {
      setMessages(messages);
    });

    socket.on('isWriting', (isWriting) => {
      setWritingMessage(isWriting);
    });

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, [socket]);

  useEffect(() => {
    if (scrollBox.current !== null) {
      if (
        scrollBox.current.scrollTop + scrollBox.current.offsetHeight ===
        scrollHeight
      ) {
        scrollBox.current.scrollTop =
          scrollBox.current.scrollHeight - scrollBox.current.offsetHeight;
      }

      setScrollHeight(scrollBox.current.scrollHeight);
    }
  }, [messages]);

  return (
    <Box bg="rgba(255,255,255, 0.5)" height="100%">
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
          </Text>
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
            <ModalContent
              p={5}
              pt={10}
              textAlign="center"
              bg="white"
              height="20vh"
            >
              <ModalCloseButton />
              <ModalBody>
                <Form {...{ setCreatingRoom, creatingRoom }} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      ) : (
        <Flex direction="column" height="100%">
          <Heading textAlign="center">All messages in {joinedRoom}</Heading>
          <Box ref={scrollBox} height="100%" className="scrollBox">
            {chatMessages && (
              <ul id="messages">
                {messages.map((chatMessage, index) => (
                  <Box key={index}>
                    <Box
                      bg="white"
                      mt="1"
                      p="1rem"
                      w="fit-content"
                      maxW="20rem"
                      h="fit-content"
                      borderRadius="md"
                    >
                      <Text>{chatMessage.body}</Text>
                    </Box>
                    <Text fontStyle="italic" fontSize="0.8rem" color="black">
                      From: {chatMessage.sender}
                    </Text>
                  </Box>
                ))}
              </ul>
            )}
          </Box>
          <Box w="100%" bottom="0" left="0" right="0">
            <Text>{writingMessage && 'someone is writing a message...'}</Text>

            <ChatForm
              {...{ setWritingMessage, writingMessage, message, setMessage }}
            />
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default MessageContainer;

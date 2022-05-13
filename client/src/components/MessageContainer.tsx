import Form from './Form';
import { useEffect, useRef, useState } from 'react';
import { Message } from '../../../types';
import LogoutIcon from '@mui/icons-material/Logout';

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
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Fade,
  Spacer,
} from '@chakra-ui/react';

import { useSocket } from '../context/socketContext';
import communication from '../assets/com.png';
import ChatForm from './ChatForm';

function MessageContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [writingMessage, setWritingMessage] = useState(false);
  const { socket, nickname, joinedRoom, chatMessages } = useSocket();
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
        scrollHeight -
          (scrollBox.current.scrollTop + scrollBox.current.offsetHeight) <
        1
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
          <Flex bg="white" color="gray.400" alignItems="center">
            <Heading padding="0.5em" size="md">
              #{joinedRoom}
            </Heading>
            <Spacer />
            <LogoutIcon />
          </Flex>
          <Box
            ref={scrollBox}
            height="100%"
            className="scrollBox"
            padding="2em"
          >
            <Box margin="auto">
              {chatMessages && (
                <ul id="messages">
                  {messages.map((chatMessage, index) => (
                    <Flex
                      direction="column"
                      align={
                        chatMessage.sender === nickname
                          ? 'flex-start'
                          : 'flex-end'
                      }
                      margin=".5rem 0"
                      key={index}
                    >
                      <Box
                        bg={
                          chatMessage.sender === nickname ? 'white' : '#DDDDFF'
                        }
                        mt="1"
                        p="1rem"
                        w="fit-content"
                        maxW="20rem"
                        h="fit-content"
                        borderRadius="md"
                      >
                        <Text fontWeight="bold" fontSize="0.8rem" color="black">
                          {chatMessage.sender}
                        </Text>
                        <Text>{chatMessage.body}</Text>
                      </Box>
                    </Flex>
                  ))}
                </ul>
              )}
            </Box>
          </Box>
          <Box>
            <Fade in={writingMessage}>
              <Box height="2rem" padding="0 1rem">
                <Text>
                  {writingMessage && 'someone is writing a message...'}
                </Text>
              </Box>
            </Fade>
            <ChatForm {...{ setWritingMessage, writingMessage }} />
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default MessageContainer;

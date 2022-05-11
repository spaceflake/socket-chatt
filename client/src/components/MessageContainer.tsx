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
import ChatForm from './ChatForm';

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
    console.log('switched room to: ' + joinedRoom);
  }, [joinedRoom]);

  useEffect(() => {
    // Receive room chat history
    socket.on('history', (messages) => {
      setMessages(messages);
    });

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, [socket]);

  return (
    <Box
      h="100%"
      className="scrollBox"
      position="relative"
      bg="rgba(255,255,255, 0.5)"
    >
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
            {/* add spinner thingy */}
            <Text>
              {/* {nickname} is writing a message ... <Box isLoading spinner={<BeatLoader size={8} color='white' />}></Box> */}
            </Text>
            <Text>{writingMessage && 'is writing'}</Text>

            <ChatForm
              {...{ setWritingMessage, writingMessage, message, setMessage }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default MessageContainer;

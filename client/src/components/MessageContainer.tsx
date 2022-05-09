import Form from './Form';
import { useContext, useEffect, useState } from 'react';
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

import { Chats, SocketContext } from '../context/socketContext';
import communication from '../assets/com.png';

function MessageContainer() {
  const [Messages, setMessages] = useState<Chats[]>([]);
  const [writingMessage, setWritingMessage] = useState(true);
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
    // socket.on('chat message', (message) => {
    //   setMessages([...Messages, message])
    // })
    socket.on('connect', () => {
      console.log('connected');
    });
    // socket.on('message', (chatMessage: string) => {
    //   console.log(nickname + ' wrote : ' + chatMessage);
    //   const newMessageList = [chatMessage, ...Messages];
    //   setMessages(newMessageList);
    // });
    // socket.on('roomList', (rooms) => {
    //   console.log(rooms);
    // });
    setMessages(chatMessages);
  }, []);

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
                {Messages.map((chatMessage, index) => (
                  <li key={index}>
                    <p>From: {chatMessage.sender} </p>
                    <p>{chatMessage.msg}</p>
                  </li>
                ))}
              </ul>
            )}
          </Box>
          <Box position="absolute" bottom={0} w="100%">
            <Text>
              {nickname} has connected to {joinedRoom}
            </Text>
            <Form {...{ setWritingMessage }} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default MessageContainer;

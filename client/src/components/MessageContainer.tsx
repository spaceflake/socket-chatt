import Form from "./Form";
import { useContext, useEffect, useState } from "react";
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
} from "@chakra-ui/react";

import { SocketContext } from "../context/socketContext";
import communication from "../assets/com.png";

function MessageContainer() {
  const [Messages, setMessages] = useState<string[]>([]);
  const [writingMessage, setWritingMessage] = useState(true);
  const { socket, nickname, allRooms, joinedRoom } = useContext(SocketContext);
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
    socket.on("connect", () => {
      console.log("connected");
    });
    // socket.on('roomList', (rooms) => {
    //   console.log(rooms);
    // });
  }, []);

  return (
    <Box height="100%" position="relative" bg="lightblue">
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
                  <Form {...{ setCreatingRoom, creatingRoom, socket }} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Text>
        </Flex>
      ) : (
        <>
          <Box>
            <ul id="messages">
              <Heading textAlign="center">All messages in {joinedRoom}</Heading>
              {Messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
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

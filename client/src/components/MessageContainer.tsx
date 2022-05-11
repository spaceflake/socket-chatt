import Form from "./Form";
import { useContext, useEffect, useState } from "react";
import { Message } from "../../../types";

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
import ChatForm from "./ChatForm";

function MessageContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
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
    console.log("switched room to: " + joinedRoom);
  }, [joinedRoom]);

  useEffect(() => {
    // Receive room chat history
    socket.on("history", (messages) => {
      setMessages(messages);
    });

    socket.on("isWriting", (isWriting) => {
      setWritingMessage(isWriting);
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, [socket]);

  return (
    <Box h="100%" position="relative" bg="rgba(255,255,255, 0.5)">
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
        <Box h="100%">
          <Box h="100%">
            <Heading textAlign="center">All messages in {joinedRoom}</Heading>
            <Box h="100%" className="scrollBox">
              {chatMessages && (
                <ul id="messages">
                  {messages.map((chatMessage, index) => (
                    <>
                      <Box
                        key={index}
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
                    </>
                  ))}
                </ul>
              )}
            </Box>
          </Box>
          <Box position="absolute" bottom={0} w="100%">
            <Text>{writingMessage && "someone is writing a message..."}</Text>

            <ChatForm
              {...{ setWritingMessage, writingMessage, message, setMessage }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MessageContainer;

import Form from "./Form";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../../types";
import { useEffect, useRef, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

function MessageContainer() {

  const [Messages, setMessages] = useState<string[]>([]);
  const firstRun = useRef(true);

  const [Messages, setMessages] = useState<string[]>([])

  // useEffect(() => {
  //   socket.on('chat message', (message) => {
  //     setMessages([...Messages, message])
  //   })
  // }, [Messages])


  return (
    <Box height="100%" position="relative">
      <Box>
        <ul id="messages">
          <Heading textAlign='center'>All messages in *chatroomname*</Heading>
          {Messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </Box>
      <Box position="absolute" bottom={0} w='100%'>
        <Form />
      </Box>
    </Box>
  );
}

export default MessageContainer;

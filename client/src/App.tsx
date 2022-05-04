import { useState } from "react";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../types";

import "./App.css";
import MessageContainer from "./components/MessageContainer";
import Form from "./components/Form";
import RoomList from "./components/RoomList";
import ActiveList from "./components/ActiveList";
import StatusBox from "./components/StatusBox";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  autoConnect: false,
});

function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <Container bg="gray.100" maxW="100%" h="100vh" padding="0" margin="0">
      {!isActive ? (
        <Flex justify="center" align="center" direction="column">
          <Heading>Welcome</Heading>
          <Form socket={socket} active={setIsActive} />
        </Flex>
      ) : (
        <>
          <Flex w="100%" h="100vh">
            {/* conditional for active users in room */}
            <Flex
              direction="column"
              gap="2rem"
              w="max-content"
              h="100%"
              bg="black"
              color="white"
              position='relative'
            >
              <Box mt={10} p={5}>
                <Text>DM's</Text>

                <Divider />
                <ActiveList />
                <Divider />
                <RoomList />
                <Divider />
              </Box>
              <Box bg="gray" position='absolute' bottom='0' w='100%'>
                <StatusBox />
              </Box>
            </Flex>
            <Box w="80%">
              <MessageContainer />
            </Box>
          </Flex>
        </>
      )}
    </Container>
  );
}

export default App;

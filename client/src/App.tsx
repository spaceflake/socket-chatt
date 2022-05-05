import { useContext, useEffect, useState } from 'react';

import './App.css';
import MessageContainer from './components/MessageContainer';
import Form from './components/Form';
import RoomList from './components/RoomList';
import ActiveList from './components/ActiveList';
import StatusBox from './components/StatusBox';
import { Box, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import { SocketContext } from './context/socketContext';

function App() {
  const [isOnline, setIsOnline] = useState(false);
  const socket = useContext(SocketContext);

  // useEffect(() => {
  //   socket;
  // }, []);

  return (
    <Container bg="gray.100" maxW="100%" h="100vh" padding="0" margin="0">
      {!isOnline ? (
        <Flex h="100%" justify="center" align="center" direction="column">
          <Heading>Welcome</Heading>
          <Form {...{ setIsOnline }} />
        </Flex>
      ) : (
        <>
          <Flex h="100%">
            {/* conditional for active users in room */}
            <Flex
              direction="column"
              gap="2rem"
              w="15vw"
              h="100%"
              bg="black"
              color="white"
              position="relative"
            >
              <Box mt={10} p={5} className="leftSideBar">
                {/* should have scroll if too many items (in this specific box) */}
                <Heading>DM's</Heading>
                <Divider borderWidth={3} mt={5} mb={5} />
                {/* should have scroll if too many items (in this specific box) */}
                <Heading>All rooms</Heading>
                <RoomList />
                <Divider borderWidth={3} mt={5} mb={5} />
              </Box>
              <Box bg="gray" position="absolute" bottom="0" w="100%">
                <StatusBox />
              </Box>
            </Flex>
            {/* should have scroll if too many items (in this specific box) */}
            <Box w="100%">
              <MessageContainer />
            </Box>
            <Flex
              direction="column"
              gap="2rem"
              w="15vw"
              h="100%"
              bg="black"
              color="white"
            >
              {/* should have scroll if too many items (in this specific box) */}
              <Box mt={5} p={5} className="rightSideBar">
                <Heading>All online</Heading>
                <Divider borderWidth={3} mt={5} mb={5} />
                <ActiveList />
              </Box>
            </Flex>
          </Flex>
        </>
      )}
    </Container>
  );
}

export default App;

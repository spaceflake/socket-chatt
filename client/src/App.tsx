import { useContext, useEffect, useState } from 'react';

import './App.css';
import MessageContainer from './components/MessageContainer';
import MessageIcon from '@mui/icons-material/Message';
import Form from './components/Form';
import RoomList from './components/RoomList';
import ActiveList from './components/ActiveList';
import StatusBox from './components/StatusBox';
import {
  Box,
  Container,
  Flex,
  Heading,
  Show,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';

function App() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <Container
      bg="linear-gradient(77deg, rgba(240,204,233,1) 0%, rgba(114,19,255,1) 100%)"
      maxW="100%"
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="3vw"
      margin="0"
    >
      {!isOnline ? (
        <Container
          minH="25rem"
          bg="rgba(255,255,255, 0.5)"
          boxShadow="10px 10px 10px 3px rgba(0,0,0, 0.1)"
          borderRadius="1rem"
          centerContent
        >
          <Box h="30rem" alignItems="center">
            <VStack h="30rem" alignItems="center" justify="center">
              <Heading>Welcome to ChatUp</Heading>

              <Form {...{ setIsOnline }} />
            </VStack>
          </Box>
        </Container>
      ) : (
        <Flex
          h="100%"
          w="100%"
          borderRadius="2xl"
          bg="rgb(195, 195, 195, 50%)"
          boxShadow="10px 10px 10px 3px rgba(0,0,0, 0.1)"
        >
          <Flex direction="column" gap="2rem">
            <Box flex="1" mt={5} p={2}>
              <RoomList />
              {/* <Tabs size="md" borderColor="white">
                  <TabList>
                    <Tab>Rooms</Tab>
                    <Tab>Direct Messages</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                    </TabPanel>
                    <TabPanel>
                      <Text>All direct messages:</Text>
                      <Divider mt={5} mb={5} />
                      <Box className="scrollBox">
                        <ul>
                          <li>
                            <Text>
                              Morran <MessageIcon />
                            </Text>
                          </li>
                          <Divider />
                          <li>
                            <Text>
                              Emma <MessageIcon />
                            </Text>
                          </li>
                          <Divider />
                          <li>
                            <Text>
                              Julia <MessageIcon />
                            </Text>
                          </li>
                          <Divider />
                          <li>
                            <Text>
                              Malin <MessageIcon />
                            </Text>
                          </li>
                          <Divider />
                        </ul>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs> */}
            </Box>
            <Box
              padding={2}
              borderTop="3px"
              borderColor="white"
              borderTopStyle="solid"
            >
              <StatusBox />
            </Box>
          </Flex>
          {/* should have scroll if too many items (in this specific box) */}
          <Box flex="1">
            <MessageContainer />
          </Box>
          <Flex direction="column" gap="2rem" color="white" w="fit-content">
            {/* should have scroll if too many items (in this specific box) */}
            <Box mt={5} p={5} className="rightSideBar">
              <ActiveList />
            </Box>
          </Flex>
        </Flex>
      )}
    </Container>
  );
}

export default App;

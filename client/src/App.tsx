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
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

function App() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <Container
      bg="linear-gradient(77deg, rgba(240,204,233,1) 0%, rgba(114,19,255,1) 100%)"
      maxW="100%"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="3rem"
      margin="0"
    >
      {!isOnline ? (
        <Flex
          h="80%"
          bg="rgba(255,255,255, 0.5)"
          w="50%"
          justify="center"
          align="center"
          direction="column"
          borderRadius="1rem"
          boxShadow="10px 10px 10px 3px rgba(0,0,0, 0.1)"
        >
          <Heading mb="1rem">Welcome</Heading>
          <Form {...{ setIsOnline }} />
        </Flex>
      ) : (
        <>
          {/* the big main container */}
          <Flex
            h="100%"
            w="100%"
            borderRadius="1rem"
            bg="rgb(195, 195, 195, 50%)"
            boxShadow="10px 10px 10px 3px rgba(0,0,0, 0.1)"
          >
            {/* conditional for active users in room */}
            <Flex direction="column" maxW="20vw"
            gap="2rem" maxH="100%" position="relative">
              <Box mt={5} p={2}  className="leftSideBar">
                <Tabs size="md" borderColor="white">
                  <TabList>
                    <Tab>Rooms</Tab>
                    <Tab>Direct Messages</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <RoomList />
                    </TabPanel>
                    <TabPanel>
                      <Text>
                        All direct messages:
                      </Text>
                      <Divider mt={5} mb={5} />
                      <Box className="scrollBox">
                      {/* Do the loop of all users in a (private) room */}
                      <ul>
                        <li><Text font-size="1rem">Morran <MessageIcon /></Text></li>
                        <Divider />
                        <li><Text font-size="1rem">Emma <MessageIcon /></Text></li>
                        <Divider />
                        <li><Text font-size="1rem">Julia <MessageIcon /></Text></li>
                        <Divider />
                        <li><Text font-size="1rem">Malin <MessageIcon /></Text></li>
                        <Divider />
                      </ul>
                      </Box>

                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Box
                position="absolute"
                bottom="0"
                w="100%"
                padding={2}
                borderTop="3px"
                borderColor="white"
                borderTopStyle="solid"
              >
                <StatusBox />
              </Box>
            </Flex>
            {/* should have scroll if too many items (in this specific box) */}
            <Box mb="1rem" w="100%" h="100%">
              <MessageContainer />
            </Box>
            <Flex direction="column" gap="2rem" h="100%" color="white" w="20vw">
              {/* should have scroll if too many items (in this specific box) */}
              <Box mt={5} p={5} className="rightSideBar">
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

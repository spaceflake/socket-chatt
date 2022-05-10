import { Box, Divider, Text } from '@chakra-ui/react';
import MessageIcon from '@mui/icons-material/Message';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/socketContext';

function ActiveList() {
  const { socket, nickname, allRooms, joinedRoom } = useContext(SocketContext);

  useEffect(() => {
    socket.on('userList', (users) => {
      console.log(users);
    });
  }, [socket]);

  // console.log(socket.on('userList', (users)));

  // const users = socket.on('userList', (users)) => {
  //   console.log(users)
  // }
  return (
    <>
      {!joinedRoom ? (
        <></>
      ) : (
        <>
          <Text>All online in this room:</Text>
          <Divider mt={5} mb={5} />
          <Box className="scrollBox" h="100%">
            {/* Do the loop of all users in a room */}
            <ul>
              <li>
                <Text font-size="1rem">
                  Morran <MessageIcon />
                </Text>
              </li>
              <Divider />
              <li>
                <Text font-size="1rem">
                  Emma <MessageIcon />
                </Text>
              </li>
              <Divider />
              <li>
                <Text font-size="1rem">
                  Julia <MessageIcon />
                </Text>
              </li>
              <Divider />
              <li>
                <Text font-size="1rem">
                  Malin <MessageIcon />
                </Text>
              </li>
              <Divider />
            </ul>
          </Box>
        </>
      )}
    </>
  );
}

export default ActiveList;

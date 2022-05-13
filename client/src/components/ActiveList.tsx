import { Box, Divider, Text } from '@chakra-ui/react';
import { useSocket } from '../context/socketContext';

function ActiveList() {
  const { usersInRoom, joinedRoom } = useSocket();

  return (
    <>
      {joinedRoom && (
        <Box>
          <Text>All online in this room:</Text>
          <Divider mt={5} mb={5} />
          <Box className="scrollBox" h="100%">
            <ul>
              {usersInRoom.map((user) => (
                <Box key={user.userID}>
                  <li>{user.nickname} </li>
                  <Divider />
                </Box>
              ))}
            </ul>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ActiveList;

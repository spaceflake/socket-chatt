import { Box, Button, Divider, Text } from '@chakra-ui/react';
import MessageIcon from '@mui/icons-material/Message';
import { useEffect, useState } from 'react';
import { useSocket } from '../context/socketContext';
import { User } from '../../../types';

function ActiveList() {
  const { socket, joinedRoom } = useSocket();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on('userList', (users) => {
      setUsers(users);
    });
  }, [socket]);

  return (
    <>
      {joinedRoom && (
        <Box>
          <Text>All online in this room:</Text>
          <Divider mt={5} mb={5} />
          <Box className="scrollBox" h="100%">
            {/* Do the loop of all users in a room */}
            <ul>
              {users.map((user) => (
                <Box key={user.userID}>
                  {/* <Button
                    display="flex"
                    justifyContent="space-between"
                    w="full"
                    rightIcon={<MessageIcon />}
                    variant="unstyled"
                  >
                  </Button> */}
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

import { Box, Divider, Text } from '@chakra-ui/react';
import MessageIcon from '@mui/icons-material/Message';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socketContext';
import { User } from '../../../types';

function ActiveList() {
  const { socket, nickname, allRooms, joinedRoom } = useContext(SocketContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on('userList', (users) => {
      setUsers(users);
    });
  }, [socket]);

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
              {users.map((user) => (
                <li key={user.userID}>{user.nickname}</li>
              ))}
            </ul>
          </Box>
        </>
      )}
    </>
  );
}

export default ActiveList;

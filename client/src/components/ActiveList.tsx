import { Box, Divider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import { User } from "../../../types";

function ActiveList() {
  const { socket, joinedRoom } = useSocket();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on("userList", (users) => {
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
            <ul>
              {users.map((user) => (
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

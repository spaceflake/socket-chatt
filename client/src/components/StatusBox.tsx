import { Button, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { SocketContext } from '../context/socketContext';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

function StatusBox() {
  const { nickname } = useContext(SocketContext);

  return (
    <Flex gap={5} direction="column" justify="center" align="center">
      <Text fontWeight="bold">Logged in as:</Text>
      <Flex gap={3}>
        <Text>{nickname}</Text>
        <Text color="green">
          <ExpandCircleDownIcon />
        </Text>
      </Flex>
      {/* <Button>Log out</Button> */}
    </Flex>
  );
}

export default StatusBox;

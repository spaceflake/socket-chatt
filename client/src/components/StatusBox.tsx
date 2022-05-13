import { Box, Flex, Text } from '@chakra-ui/react';
import { useSocket } from '../context/socketContext';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

function StatusBox() {
  const { nickname } = useSocket();

  return (
    <Box bg="whiteAlpha.500" pl="2" paddingBlock="3">
      <Text fontWeight="bold">Logged in as:</Text>
      <Flex gap={3}>
        <Text>{nickname}</Text>
        <Text color="green">
          <ExpandCircleDownIcon />
        </Text>
      </Flex>
    </Box>
  );
}

export default StatusBox;

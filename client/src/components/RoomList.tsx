import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Center,
  Divider,
  Flex,
} from '@chakra-ui/react';
import Form from './Form';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socketContext';

function RoomList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [creatingRoom, setCreatingRoom] = useState(false);
  const { socket, allRooms, joinedRoom, nickname } = useContext(SocketContext);

  useEffect(() => {
    if (!creatingRoom) {
      onClose();
    }
  }, [creatingRoom]);

  return (
    <Box flexDirection="column" h="full">
      <Box>
        <Button
          onClick={() => {
            onOpen();
            setCreatingRoom(true);
          }}
          rightIcon={<AddCircleOutlineRoundedIcon />}
          mb={6}
        >
          Create Room
        </Button>
        <Text fontWeight="bold" mb={2}>
          Rooms:
        </Text>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={5} pt={10} textAlign="center" bg="white" height="20vh">
          <ModalCloseButton />
          <ModalBody>
            <Form {...{ setCreatingRoom, creatingRoom }} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex className="scrollBox" gap="1" direction="column">
        {allRooms.map((room) => (
          <Box
            as="button"
            key={room}
            value={room}
            borderRadius="sm"
            w="100%"
            bg="whiteAlpha.500"
            paddingBlock="2"
            onClick={() => {
              if (joinedRoom !== room) {
                socket.emit('leave', joinedRoom);
                console.log(nickname + ' has left' + joinedRoom);
              }
              if (joinedRoom === room) {
                console.log('already in this room');
                return;
              }
              socket.emit('join', room);
              console.log(nickname + ' has joined' + room);
            }}
          >
            <Text fontWeight="bold" align="left" ml="1.5" color="gray.700">
              #{room}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default RoomList;

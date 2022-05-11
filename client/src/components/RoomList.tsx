import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Center,
  Divider,
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
    <Center flexDirection="column" h="full">
      <Box top="0">
        <Button
          onClick={() => {
            onOpen();
            setCreatingRoom(true);
          }}
          rightIcon={<AddCircleOutlineRoundedIcon />}
          mb={2}
        >
          Create Room
        </Button>
        <Text fontWeight="bold" mb={2}>
          All available rooms:
        </Text>
        <Divider />
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
      <Box className="scrollBox" mt="5rem">
        {allRooms.map((room, index) => (
          <Box
            as="button"
            key={room}
            value={room}
            borderRadius="sm"
            w="100%"
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
            <Text fontWeight="bold" fontSize="1.2rem">
              {room}
            </Text>
            <Divider mt={1} />
          </Box>
        ))}
      </Box>
    </Center>
  );
}

export default RoomList;

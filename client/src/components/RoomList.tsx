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
} from '@chakra-ui/react';
import Form from './Form';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socketContext';

function RoomList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [creatingRoom, setCreatingRoom] = useState(false);
  // const [room, setRoom] = useState('');
  const { socket, allRooms, joinedRoom, nickname } = useContext(SocketContext);

  useEffect(() => {
    if (!creatingRoom) {
      onClose();
    }
  }, [creatingRoom]);

  // const handleJoin = () => {
  //   socket.emit('join');
  // };

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setCreatingRoom(true);
        }}
        rightIcon={<AddCircleOutlineRoundedIcon />}
      >
        Create Room
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Name your room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form {...{ setCreatingRoom, creatingRoom }} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <h1>Roomlist</h1>
      {allRooms.map((room, index) => (
        <Box
          as="button"
          key={room}
          value={room}
          bg="#739099"
          borderRadius="sm"
          p="2"
          mb="1"
          onClick={() => {
            socket.emit('leave', joinedRoom);
            console.log(nickname + ' has left' + joinedRoom);
            socket.emit('join', room);
            console.log('All rooms:' + allRooms);
          }}
        >
          Roomname: {room}
        </Box>
      ))}
    </>
  );
}

export default RoomList;

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
} from '@chakra-ui/react';
import Form from './Form';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socketContext';

function RoomList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [creatingRoom, setCreatingRoom] = useState(false);
  // const [room, setRoom] = useState('');
  const { socket, allRooms } = useContext(SocketContext);

  useEffect(() => {
    if (!creatingRoom) {
      onClose();
    }
  }, [creatingRoom]);

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
            <Form {...{ setCreatingRoom, creatingRoom, socket }} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <h1>Roomlist</h1>
      {allRooms.map((room, index) => (
        <li key={index}>{room}</li>
      ))}
    </>
  );
}

export default RoomList;

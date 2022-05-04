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
import { useState } from 'react';
function RoomList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [creatingRoom, setCreatingRoom] = useState(true);
  return (
    <>
      <Button onClick={onOpen} rightIcon={<AddCircleOutlineRoundedIcon />}>
        Create Room
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Name your room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form {...{ setCreatingRoom }} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <h1>Roomlist</h1>
    </>
  );
}

export default RoomList;

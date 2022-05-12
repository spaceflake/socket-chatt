import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useSocket } from '../context/socketContext';

interface formProps {
  setIsOnline?: Dispatch<SetStateAction<boolean>>;
  setCreatingRoom?: Dispatch<SetStateAction<boolean>>;
  creatingRoom?: boolean;
}
type Inputs = {
  input: string;
};

function Form({ setIsOnline, setCreatingRoom, creatingRoom }: formProps) {
  const { register, handleSubmit, watch } = useForm<Inputs>();

  const { socket, joinedRoom } = useSocket();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (socket && !creatingRoom) {
      socket.connect();
      socket.auth = { nickname: data.input };
    }

    if (creatingRoom && setCreatingRoom && socket) {
      socket.connect();
      let room = data.input;

      if (!room.length) {
        console.log('Ogiltigt namn på rum...');
        return;
      }

      if (joinedRoom !== room) {
        socket.emit('leave', joinedRoom);
        console.log('You left the room');
      }

      if (joinedRoom === room) {
        console.log('room aldready exists');
        return;
      }

      socket.emit('join', room);
      console.log('you entered a room');

      setCreatingRoom(false);
    }

    setIsOnline && setIsOnline(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="input">
          {setIsOnline
            ? 'Enter nickname'
            : setCreatingRoom
            ? 'Enter roomname'
            : ''}
        </FormLabel>
        <InputGroup textAlign="center">
          <Input
            focusBorderColor="gray.500"
            type="text"
            id="input"
            autoComplete="off"
            {...register('input')}
          />
          <InputRightElement w="fit-content" bg="rgba(255, 255, 255, 0.3)">
            <Button
              type="submit"
              color="black"
              bg="blackAlpha.100"
              disabled={!watch('input')}
            >
              {!creatingRoom ? 'Send' : 'Create Room'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
}

export default Form;

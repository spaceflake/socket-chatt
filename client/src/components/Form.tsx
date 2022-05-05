import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { SocketContext } from '../context/socketContext';

interface formProps {
  setIsOnline?: Dispatch<SetStateAction<boolean>>;
  setCreatingRoom?: Dispatch<SetStateAction<boolean>>;
  setWritingMessage?: Dispatch<SetStateAction<boolean>>;
  creatingRoom?: boolean;
}
type Inputs = {
  input: string;
};

function Form({
  setIsOnline,
  setCreatingRoom,
  setWritingMessage,
  creatingRoom,
}: formProps) {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const { socket, nickname, allRooms, joinedRoom } = useContext(SocketContext);

  // console.log(watch('input'))

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
      socket.emit('join', room);

      setCreatingRoom(false);
    }

    if (setWritingMessage) {
      const message = data.input;
      if (!message.length) {
        console.log('För kort meddelande');
        return;
      }

      socket.emit('message', data.input, joinedRoom);
      console.log('3', data);
    }

    setIsOnline && setIsOnline(true);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="input">
          {setIsOnline
            ? 'Enter your nickname, stupid!'
            : setCreatingRoom
            ? 'Enter roomname'
            : setWritingMessage && ''}
        </FormLabel>
        <Input
          type="text"
          id="input"
          autoComplete="off"
          {...register('input')}
        />
      </FormControl>
      <Button type="submit" w="full" variant="solid">
        {!creatingRoom ? 'Send' : 'Create Room'}
      </Button>
    </form>
  );
}

export default Form;

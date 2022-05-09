import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SocketContext } from '../context/socketContext';

interface formProps {
  setIsOnline?: Dispatch<SetStateAction<boolean>>;
  setCreatingRoom?: Dispatch<SetStateAction<boolean>>;
  setWritingMessage?: Dispatch<SetStateAction<boolean>>;
  writingMessage?: boolean;
  creatingRoom?: boolean;
  message?: string;
  setMessage?: Dispatch<SetStateAction<string>>;
}
type Inputs = {
  input: string;
};

function Form({
  setIsOnline,
  setCreatingRoom,
  setWritingMessage,
  writingMessage,
  creatingRoom,
  message,
  setMessage,
}: formProps) {
  const { register, handleSubmit, watch, reset } = useForm<Inputs>();
  const { socket, nickname, allRooms, joinedRoom } = useContext(SocketContext);

  if (setWritingMessage) {
    if (watch('input')) {
      setWritingMessage(true);
    }
  }

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

    if (writingMessage && setWritingMessage && message && setMessage) {
      setMessage(data.input);

      // let message = data.input;
      if (!message.length) {
        console.log('För kort meddelande');
        return;
      }

      socket.emit('message', message, joinedRoom);
      setWritingMessage(false);
      setMessage('');

      reset();
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
        <InputGroup>
          <Input
            type="text"
            id="input"
            autoComplete="off"
            {...register('input')}
          />
          <InputRightElement w="fit-content" bg="rgba(255, 255, 255, 0.3)">
            <Button type="submit" variant="ghost">
              {!creatingRoom ? 'Send' : 'Create Room'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button type="submit" w="full" variant="solid" disabled={!watch('input')}>
        {creatingRoom
          ? 'Create Room'
          : setIsOnline
          ? 'Enter'
          : setWritingMessage && <SendIcon />}
      </Button>
    </form>
  );
}

export default Form;

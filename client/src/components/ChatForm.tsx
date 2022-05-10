import { Dispatch, SetStateAction, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { SocketContext } from '../context/socketContext';

interface formProps {
  setWritingMessage: Dispatch<SetStateAction<boolean>>;
  writingMessage: boolean;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}
type Inputs = {
  input: string;
};

function ChatForm({ setWritingMessage, message, setMessage }: formProps) {
  const { register, handleSubmit, watch, reset } = useForm<Inputs>();
  const { socket, nickname, joinedRoom } = useContext(SocketContext);

  if (setWritingMessage) {
    if (watch('input')) {
      setWritingMessage(true);
      console.log('test random');
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('test 1');

    if (data.input.length === 0) {
      console.log('För kort meddelande');
      return;
    }

    setMessage(data.input);

    socket.emit('message', message, joinedRoom);
    console.log('test 2');
    setWritingMessage(false);
    setMessage('');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputGroup>
          <Input
            type="text"
            id="input"
            autoComplete="off"
            {...register('input')}
          />
          <InputRightElement w="fit-content" bg="rgba(255, 255, 255, 0.3)">
            <Button type="submit">Send</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
}

export default ChatForm;

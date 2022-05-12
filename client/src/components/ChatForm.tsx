import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import { useSocket } from '../context/socketContext';

interface formProps {
  setWritingMessage: Dispatch<SetStateAction<boolean>>;
  writingMessage: boolean;
}

type Inputs = {
  input: string;
};

function ChatForm({ setWritingMessage, writingMessage }: formProps) {
  const { register, handleSubmit, watch, reset } = useForm<Inputs>();
  const { socket, joinedRoom } = useSocket();

  if (watch('input')) {
    socket.emit('isWriting', true);
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.input.length === 0) {
      console.log('För kort meddelande');
      return;
    }

    socket.emit('message', data.input, joinedRoom);
    socket.emit('isWriting', false);
    setWritingMessage(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputGroup>
          <Input
            bg="#ffffff2b"
            border="none"
            focusBorderColor="gray.500"
            type="text"
            id="input"
            variant="flushed"
            placeholder="Write a message..."
            autoComplete="off"
            {...register('input')}
          />
          <InputRightElement w="fit-content" bg="rgba(255, 255, 255, 0.3)">
            <Button
              type="submit"
              _focus={{ border: '1px', borderColor: 'gray.400' }}
            >
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
}

export default ChatForm;

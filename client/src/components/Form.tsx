import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

interface formProps {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
  setIsOnline?: Dispatch<SetStateAction<boolean>>;
  setCreatingRoom?: Dispatch<SetStateAction<boolean>>;
  setWritingMessage?: Dispatch<SetStateAction<boolean>>;
}
type Inputs = {
  input: string;
};

function Form({
  socket,
  setIsOnline,
  setCreatingRoom,
  setWritingMessage,
}: formProps) {
  const { register, handleSubmit, watch } = useForm<Inputs>();

  // console.log(watch('input'))

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (socket) {
      socket.auth = { nickname: data.input };
      socket.connect();
    }

    if (setCreatingRoom && socket) {
      const room = data.input;
      if (!room.length) {
        console.log('Ogiltigt namn på rum...');
        return;
      }
      socket.emit('join', room);
    }

    if (setWritingMessage && socket) {
      const message = data.input;
      if (!message.length) {
        console.log('För kort meddelande');
        return;
      }

      socket.emit('message', data.input, joinedRoom);
    }

    setIsOnline && setIsOnline(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="input">
          {!setCreatingRoom ? 'Enter your nickname, stupid!' : 'Enter roomname'}
        </FormLabel>
        <Input
          type="text"
          id="input"
          autoComplete="off"
          {...register('input')}
        />
      </FormControl>
      <Button type="submit" w="full" variant="solid">
        {!setCreatingRoom ? 'Send' : 'Create Room'}
      </Button>
    </form>
  );
}

export default Form;

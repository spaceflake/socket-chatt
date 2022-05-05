import React, { useState, useEffect, createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

import { ClientToServerEvents, ServerToClientEvents } from '../../../types';

interface IContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  nickname: string;
  roomsa: string[];
}

interface Props {
  children: React.ReactNode;
}

const defaultState = {
  socket: io(),
  nickname: '',
  roomsa: [],
};

export const SocketContext = createContext<IContext>(defaultState);

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState(defaultState.socket);
  const [nickname, setNickname] = useState(defaultState.nickname);
  const [roomsa, setRoomsa] = useState(defaultState.roomsa);

  useEffect(() => {
    setSocket(socket);

    setNickname(nickname);

    console.log(socket);

    socket.on('connected', (nickname) => {
      console.log(nickname);
      setNickname(nickname);
    });

    socket.on('roomList', (rooms) => {
      console.log(rooms);
      setRoomsa(roomsa.concat(rooms));
    });

    // return () => {
    //   // Anything in here is fired on component unmount.
    //   if (socket) {
    //     socket.disconnect();
    //   }
    // };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, nickname, roomsa }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => useContext(SocketContext);

import React, { useState, useEffect, createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

import { ClientToServerEvents, ServerToClientEvents } from '../../../types';

interface IContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  nickname: string;
  allRooms: string[];
  joinedRoom: string;
}

interface Props {
  children: React.ReactNode;
}

const defaultState = {
  socket: io(),
  nickname: '',
  allRooms: [],
  joinedRoom: '',
};

export const SocketContext = createContext<IContext>(defaultState);

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState(defaultState.socket);
  const [nickname, setNickname] = useState(defaultState.nickname);
  const [allRooms, setAllRooms] = useState(defaultState.allRooms);
  const [joinedRoom, setJoinedRoom] = useState(defaultState.joinedRoom);

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
      setAllRooms(allRooms.concat(rooms));
    });

    socket.on('joined', (room) => {
      console.log(room);
      setJoinedRoom(room);
    });

    // return () => {
    //   // Anything in here is fired on component unmount.
    //   if (socket) {
    //     socket.disconnect();
    //   }
    // };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, nickname, allRooms, joinedRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => useContext(SocketContext);

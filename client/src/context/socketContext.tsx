import React, { useState, useEffect, createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

import { ClientToServerEvents, ServerToClientEvents } from '../../../types';

interface IContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  nickname: string;
  allRooms: string[];
  joinedRoom: string;
  leftRoom: string;
}

interface Props {
  children: React.ReactNode;
}

const defaultState = {
  socket: io(),
  nickname: '',
  allRooms: [],
  joinedRoom: '',
  leftRoom: '',
};

export const SocketContext = createContext<IContext>(defaultState);

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState(defaultState.socket);
  const [nickname, setNickname] = useState(defaultState.nickname);
  const [allRooms, setAllRooms] = useState(defaultState.allRooms);
  const [joinedRoom, setJoinedRoom] = useState(defaultState.joinedRoom);
  const [leftRoom, setleftRoom] = useState(defaultState.leftRoom);

  useEffect(() => {
    setSocket(socket);

    setNickname(nickname);

    console.log(socket);

    // dags för mess

    socket.on('connected', (nickname) => {
      console.log('Nickname: ' + nickname);
      setNickname(nickname);
    });

    socket.on('roomList', (rooms) => {
      console.log('the list of all rooms: ' + rooms);
      setAllRooms(allRooms.concat(rooms));
    });

    socket.on('joined', (room) => {
      console.log('user has joined room: ' + room);
      setJoinedRoom(room);
    });

    socket.on('left', (room) => {
      console.log('user has left room: ' + room);
      setleftRoom(room);
    });

    // return () => {
    //   // Anything in here is fired on component unmount.
    //   if (socket) {
    //     socket.disconnect();
    //   }
    // };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket, nickname, allRooms, joinedRoom, leftRoom }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => useContext(SocketContext);

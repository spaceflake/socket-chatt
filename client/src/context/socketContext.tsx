import React, { useState, useEffect, createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

import {
  ClientToServerEvents,
  ServerToClientEvents,
  Message,
} from '../../../types';

interface IContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  nickname: string;
  allRooms: string[];
  joinedRoom: string;
  setJoinedRoom: React.Dispatch<React.SetStateAction<string>>;
  leftRoom: string;
  chatMessages: Message[];
  users: string[];
}

interface Props {
  children: React.ReactNode;
}

const defaultState = {
  socket: io({ autoConnect: false }),
  nickname: '',
  allRooms: [],
  joinedRoom: '',
  setJoinedRoom: () => {},
  leftRoom: '',
  chatMessages: [],
  users: [],
};

export const SocketContext = createContext<IContext>(defaultState);

export const SocketProvider = ({ children }: Props) => {
  const [socket] = useState(defaultState.socket);
  const [users, setUsers] = useState<string[]>([]);
  const [nickname, setNickname] = useState(defaultState.nickname);
  const [allRooms, setAllRooms] = useState(defaultState.allRooms);
  const [joinedRoom, setJoinedRoom] = useState(defaultState.joinedRoom);
  const [leftRoom, setleftRoom] = useState(defaultState.leftRoom);
  const [chatMessages, setchatMessages] = useState<Message[]>(
    defaultState.chatMessages
  );

  useEffect(() => {
    socket.on('connected', (nickname) => {
      console.log('Nickname: ' + nickname);
      setNickname(nickname);
      setUsers([...users, nickname]);
      console.log(users);
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

    // socket.on('message', (chatMessage: string, from) => {
    //   console.log(
    //     'ehheheheheehheheh' + from.nickname + ' wrote : ' + chatMessage
    //   );
    //   chatMessages.push({
    //     id: from.id,
    //     sender: from.nickname,
    //     msg: chatMessage,
    //   });
    //   setchatMessages(chatMessages);
    //   console.log(chatMessages);
    // });
    // socket.on('message', (chatMessage: string) => {
    //   console.log(nickname + ' wrote : ' + chatMessage);
    //   const newMessageList = [chatMessage, ...Messages];
    //   setMessages(newMessageList);
    // });

    return () => {
      // Anything in here is fired on component unmount.
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        nickname,
        allRooms,
        joinedRoom,
        setJoinedRoom,
        leftRoom,
        chatMessages,
        users,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => useContext(SocketContext);

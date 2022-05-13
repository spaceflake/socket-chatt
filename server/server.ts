import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ServerSocketData,
} from '../types';
import { getRooms, getUsersInRoom } from './roomStore';
import registerChatHandler from './chatHandler';

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ServerSocketData
>();

export type IOServer = typeof io;
export type IOSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ServerSocketData
>;

io.use((socket, next) => {
  const nickname: string = socket.handshake.auth.nickname;
  if (!nickname) {
    return next(new Error('Invalid nickname'));
  }
  socket.data.nickname = nickname;
  next();
});

io.of('/').adapter.on('leave-room', (room, id) => {
  if (room === id) return;
  console.log(`socket ${id} has left room ${room}`);
  io.to(room).emit('userList', getUsersInRoom(io, room));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  if (socket.data.nickname) {
    socket.emit('connected', socket.data.nickname);

    socket.emit('roomList', getRooms(io));
  }


  registerChatHandler(io, socket);
});

io.listen(4000);

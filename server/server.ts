import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ServerSocketData,
} from '../types';
import { getRooms } from './roomStore';
import registerChatHandler from './chatHandler';

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ServerSocketData
>();

io.use((socket: Socket, next) => {
  const nickname: string = socket.handshake.auth.nickname;
  if (!nickname || nickname.length < 3) {
    return next(new Error('Invalid nickname'));
  }
  socket.data.nickname = nickname;
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected');

  if (socket.data.nickname) {
    socket.emit('connected', socket.data.nickname);

    // TODO: Kolla om ett nytt rum skapats, om så sker redan en io.emit till alla sockets med alla rum.
    socket.emit('roomList', getRooms(io));
  }

  console.log(socket.data.nickname);

  registerChatHandler(io, socket);
});

io.listen(4000);

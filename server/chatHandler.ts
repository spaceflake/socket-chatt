import type { IOServer, IOSocket } from './server';
import { getRooms, getUsersInRoom } from './roomStore';
import {
  addMessageToRoom,
  deleteRoom,
  getMessagesForRoom,
} from './roomMessageStore';

export default (io: IOServer, socket: IOSocket) => {
  socket.on('join', (room) => {
    // Bestämmer om alla rum skall emitas till samtliga sockets
    const shouldBroadcastRooms: boolean = !getRooms(io).includes(room);

    socket.join(room);

    if (shouldBroadcastRooms) {
      io.emit('roomList', getRooms(io));
    }

    socket.emit('joined', room);
    io.to(room).emit('userList', getUsersInRoom(io, room));

    // Broadcast to room the status of isWriting boolean
    socket.on('isWriting', (isWriting) => {
      socket.broadcast.to(room).emit('isWriting', isWriting);
    });

    // Get messages from room and emit to client
    const history = getMessagesForRoom(room);
    socket.emit('history', history);
  });

  socket.on('leave', (room) => {
    socket.leave(room);

    const users = getUsersInRoom(io, room);
    if (users.length === 0) {
      deleteRoom(room);
    }

    // io.to(room).emit('left', `user has left the room`);
    io.emit('roomList', getRooms(io));
  });

  socket.on('message', (message, to) => {
    console.log(message, to);

    if (!socket.data.nickname) {
      return socket.emit('_error', 'Missing nickname on socket..');
    }

    io.to(to).emit('message', {
      body: message,
      sender: socket.data.nickname,
    });

    addMessageToRoom(to, { sender: socket.data.nickname, body: message });
  });
};

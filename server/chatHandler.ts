import type { IOServer, IOSocket } from './server';
import { getRooms, getUsers, getUsersInRoom } from './roomStore';
import { ServerSocketData, Message } from '../types';
import { addMessageToRoom, getMessagesForRoom } from './roomMessageStore';

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

     
    socket.broadcast.to(room).emit('isWriting', true)
    socket.on('isWriting',() => console.log('someone is writing a message'))

    // Get messages from room and emit to client
    const history = getMessagesForRoom(room);
    socket.emit('history', history);
  });

  

  socket.on('leave', (room) => {
    socket.leave(room);
    // io.to(room).emit('left', `user has left the room`);
    // remove room if room is empty   room.sockets.length bleh something?
    io.emit('roomList', getRooms(io));
  });

  // list all users in ROOM
  //   io.of("/").adapter
  // interface ChatRoom{
  //   name; string;
  //   sockets: ServerSocketData[];
  // }
  //   function getRooms(io: IoServer):ChatRoom[]{
  //     for (const [id, socketIds]) of io.sockets.adapter.rooms){
  //       const sockets = Array.from(socketIds.map(id) => io.sockets.sockets.get(id)
  //       rooms.push({
  //         name: id;
  //         sockets: sockets.filter((s) => s?.data) as ServerSocketData
  //       }))
  //     }
  //   }

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

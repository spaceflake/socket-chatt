import { Server, Socket } from 'socket.io'
import { getRooms } from './roomStore'

export default (io: Server, socket: Socket) => {
  socket.on('join', (room) => {
    // Bestämmer om alla rum skall emitas till samtliga sockets
    const shouldBroadcastRooms: boolean = !getRooms(io).includes(room)

    socket.join(room)

    if (shouldBroadcastRooms) {
      io.emit('roomList', getRooms(io))
    }

    socket.emit('joined', room)
  })

  socket.on('leave', (room) => {
    socket.leave(room);
    io.to(room).emit(`user has left the room`);
    io.emit('roomList', getRooms(io))
  })

  socket.on('message', (message, to) => {
    console.log(message, to)

    if (!socket.data.nickname) {
      return socket.emit('_error', 'Missing nickname on socket..')
    }

    io.to(to).emit('message', message, {
      id: socket.id,
      nickname: socket.data.nickname,
    })
  })
}

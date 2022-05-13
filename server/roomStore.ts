import { User } from '../types';
import type { IOServer } from './server';

export function getRooms(io: IOServer) {
  const rooms = [];
  console.log(io.sockets.adapter.rooms);
  for (let [id, sockets] of io.sockets.adapter.rooms) {
    if (!sockets.has(id)) {
      rooms.push(id);
    }
  }
  return rooms;
}

export function getUsers(io: IOServer) {
  const users: User[] = [];
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      nickname: socket.data.nickname,
    });
  }
  return users;
}

export function getUsersInRoom(io: IOServer, room: string) {
  const users: User[] = [];

  const roomSockets = io.sockets.adapter.rooms.get(room);

  for (let [id, socket] of io.of('/').sockets) {
    if (roomSockets?.has(id)) {
      users.push({
        userID: id,
        nickname: socket.data.nickname,
      });
    }
  }
  return users;
}

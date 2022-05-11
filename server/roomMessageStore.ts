import { Message } from '../types';

// Map room objects with users and messages
const map = new Map<string, Message[]>();
// const mapAlt: { [key: string]: Message[] } = {};

export function getMessagesForRoom(room: string) {
  // Get messages from room and return empty array if undefined
  return map.get(room) ?? [];
}

export function addMessageToRoom(room: string, message: Message) {
  // Get reference to rooms message array
  const msgList = map.get(room);

  if (msgList === undefined) {
    // Create new array containing received message and add to room -> message map
    map.set(room, [message]);
  } else {
    // Push message to existing mapped message array
    msgList.push(message);
  }

  console.dir(map, { depth: null });
}

// const message: Message = { sender: 'tomas', body: 'hej' };

// addMessageToRoom('rum1', message);

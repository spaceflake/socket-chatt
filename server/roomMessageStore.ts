import { Message } from '../types';

// Map room objects with users and messages
const map = new Map<string, Message[]>();
// const mapAlt: { [key: string]: Message[] } = {};

export function getMessagesForRoom(room: string) {
  // map.get('afsad')
}

export function addMessageToRoom(room: string, message: Message) {
  const msgList: Message[] = [];
  const newMsgList = [...msgList, message];
  if (room) {
    map.set(room, newMsgList);
  }
  console.dir(map, { depth: null });
}

// const message: Message = { sender: 'tomas', body: 'hej' };

// addMessageToRoom('rum1', message);

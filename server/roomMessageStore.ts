import { Message } from '../types';

// Map room objects with users and messages
const map = new Map<string, Message[]>();
const mapAlt: { [key: string]: Message[] } = {};

export function getMessagesForRoom(room: string) {}

export function addMessageToRoom(room: string, message: Messsage) {}

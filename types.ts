export type Message = {
  sender: string;
  body: string;
};

export interface ServerToClientEvents {
  message: (message: Message) => void;
  connected: (nickname: string) => void;
  roomList: (rooms: string[]) => void;
  joined: (room: string) => void;
  left: (room: string) => void
  _error: (errorMessage: string) => void;
}

export interface ClientToServerEvents {
  message: (message: string, to: string) => void;
  join: (room: string) => void;
  leave: (room: string) => void
  connected: (nickname: string) => void;
}

export interface InterServerEvents {}

export interface ServerSocketData {
  nickname: string;
}

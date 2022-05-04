import Form from './Form'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../../../types'
import { useEffect, useRef, useState } from 'react'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

function MessageContainer() {
  const [Messages, setMessages] = useState<string[]>([])

  // useEffect(() => {
  //   socket.on('chat message', (message) => {
  //     setMessages([...Messages, message])
  //   })
  // }, [Messages])

  return (
    <>
      <ul id="messages">
        {Messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <Form />
    </>
  )
}

export default MessageContainer

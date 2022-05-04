import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../../../types'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

function Form() {
  const [input, setInput] = useState('')

  useEffect(() => {
    socket.on('welcome', (message) => {
      console.log(message)
    })
  }, [])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    socket.emit('chat message', input)
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} id="form">
      <input
        type="text"
        name="message"
        id="input"
        value={input}
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  )
}

export default Form

import { useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../../types'

import './App.css'
import MessageContainer from './components/MessageContainer'
import Form from './components/Form'
import RoomList from './components/RoomList'
import ActiveList from './components/ActiveList'
import StatusBox from './components/StatusBox'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  autoConnect: false,
})

function App() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="App">
      {!isActive ? (
        <Form socket={socket} active={setIsActive} />
      ) : (
        <>
          <div>
            {/* conditional for active users in room */}
            <ActiveList />
            <RoomList />
            <StatusBox />
          </div>

          <MessageContainer />
        </>
      )}
    </div>
  )
}

export default App

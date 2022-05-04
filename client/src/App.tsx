import { useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../../types'

import './App.css'
import MessageContainer from './components/MessageContainer'
import Form from './components/Form'
import RoomList from './components/RoomList'
import ActiveList from './components/ActiveList'
import StatusBox from './components/StatusBox'
import { Box, Center, Container, Flex, Heading } from '@chakra-ui/react'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  autoConnect: false,
})

function App() {
  const [isActive, setIsActive] = useState(false)

  return (
    <Container h="100%">
      {!isActive ? (
        <Flex h="100%" justify="center" align="center" direction="column">
          <Heading>Welcome</Heading>
          <Form socket={socket} active={setIsActive} />
        </Flex>
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
    </Container>
  )
}

export default App

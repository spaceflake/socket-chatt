import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import MessageContainer from './components/MessageContainer'
import Form from './components/Form'
import RoomList from './components/RoomList'
import ActiveList from './components/ActiveList'
import StatusBox from './components/StatusBox'

function App() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="App">
      {!isActive ? (
        <div>set nick form</div>
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

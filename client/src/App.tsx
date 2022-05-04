import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import MessageContainer from './components/MessageContainer'
import Form from './components/Form'
import RoomList from './components/RoomList'
import ActiveList from './components/ActiveList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <ActiveList />
        <RoomList />
      </div>

      <MessageContainer />
    </div>
  )
}

export default App

import { useContext } from 'react';
import { SocketContext } from '../context/socketContext';

function StatusBox() {
  const { nickname } = useContext(SocketContext);

  return (
    <>
      <h1>status box here</h1>
      <p>{nickname}</p>
      <button>exit</button>
    </>
  );
}

export default StatusBox;

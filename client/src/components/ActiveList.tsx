import { useContext } from 'react';
import { SocketContext } from '../context/socketContext';

function ActiveList() {
  const { users } = useContext(SocketContext);

  console.log(users);
  return (
    <>
      <h1>Active user list</h1>
      {users?.map((user, i) => (
        <p key={i}>{user}</p>
      ))}
    </>
  );
}

export default ActiveList;

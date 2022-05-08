import React, {useState} from 'react';
import { LoggedInContext } from './Context/LoggedInContext';
import Routing from './Routes';
import { SocketContext } from './Context/socketContext';
import { useUser } from './Auth/useUser';
import io from 'socket.io-client';

const socket = io.connect('/');

export default function App(){
  const [loggedIn, setLoggedIn] = useState(false);
  const [User, setUser] = useState(false);
  return (
    <SocketContext.Provider value={{socket}}>
      <LoggedInContext.Provider value={{loggedIn, setLoggedIn, User, setUser}}>
        <Routing/>
      </LoggedInContext.Provider>
    </SocketContext.Provider>
  )
}
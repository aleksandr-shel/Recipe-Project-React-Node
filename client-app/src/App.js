import React, {useState} from 'react';
import { LoggedInContext } from './Context/LoggedInContext';
import Routing from './Routes';
import { SocketContext } from './Context/socketContext';

import io from 'socket.io-client';

const socket = io.connect('/');

export default function App(){
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <SocketContext.Provider value={{socket}}>
      <LoggedInContext.Provider value={{loggedIn, setLoggedIn}}>
        <Routing/>
      </LoggedInContext.Provider>
    </SocketContext.Provider>
  )
}
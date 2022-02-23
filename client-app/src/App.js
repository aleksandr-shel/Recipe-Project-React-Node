import React, {useState} from 'react';
import { LoggedInContext } from './Context/LoggedInContext';
import Routing from './Routes';

export default function App(){
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoggedInContext.Provider value={{loggedIn, setLoggedIn}}>
      <Routing/>
    </LoggedInContext.Provider>
  )
}
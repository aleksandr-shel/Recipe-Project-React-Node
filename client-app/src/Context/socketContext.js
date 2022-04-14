import { createContext, useContext } from "react";


export const SocketContext = createContext();

export function useSocketContext(){
    return useContext(SocketContext);
}
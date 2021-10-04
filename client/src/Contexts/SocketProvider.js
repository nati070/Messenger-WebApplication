import React, { useState, createContext, useEffect } from "react";
import { io } from "socket.io-client";

const socketAddress = "https://messengerwebapp.herokuapp.com"

export const SocketContext = React.createContext();

export const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState();


  useEffect(() => {
    const newSocket = io(socketAddress);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={[socket]}>
      {props.children}
    </SocketContext.Provider>
  );
};

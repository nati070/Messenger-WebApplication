import React, { useState, createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = React.createContext();

export const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState();


  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={[socket]}>
      {props.children}
    </SocketContext.Provider>
  );
};

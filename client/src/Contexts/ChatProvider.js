import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = (props) => {
  const [nameOfRoom, setNameOfRoom] = useState("");
  const [username, setUsername] = useState("");
  const [dataChat, dataChatVal] = useState({});
  const [conversation, setConversation] = useState([])


  return (
    <ChatContext.Provider
      value={{
        nameOfRoom: [nameOfRoom, setNameOfRoom],
        username: [username, setUsername],
        dataChat :[dataChat, dataChatVal],
        conversation : [conversation, setConversation]
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

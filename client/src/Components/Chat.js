import { SocketContext } from "../Contexts/SocketProvider";
import { ChatContext } from "../Contexts/ChatProvider";
import React, { useState, useContext, useEffect , useRef } from "react";
import SendComp from "./SendPattren";
import RecieveComp from "./RecievePattren"


function ChatComp(props) {

  const [socket] = useContext(SocketContext);
  const {conversation ,username } = useContext(ChatContext);

  const [conversationVal] = conversation
  const [usernameVal] = username

  const [conversationDisplay, setConversationDisplay] = useState([]);

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth"})
  }

  useEffect(scrollToBottom, [props]);

  useEffect(() => {
    if (conversationVal) {
      let room =  conversationVal.map((msg, index) => {
        console.log(msg)
        return (  
          ((msg.send === usernameVal) ?  <RecieveComp key={index} msg={msg.msg}/> : <SendComp  key={index} msg={msg.msg}/> )
        );
      });
      setConversationDisplay(room);
    }
  }, [socket , conversationVal,usernameVal]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto"})
  }, [conversationDisplay]);


  return <div className="ref">{conversationDisplay}
  <div ref={messagesEndRef}></div>
  </div>;
}

export default ChatComp;

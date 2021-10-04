import { Box, TextField, Button, Grid, Paper, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useContext } from "react";

import { SocketContext } from "../Contexts/SocketProvider";
import { ChatContext } from "../Contexts/ChatProvider";
import SendIcon from "@mui/icons-material/Send";

const useStyle = makeStyles(() => ({
  textfield: {
    width: "70%",
    left: "12%",
    margin: 10,
    marginBottom: "20px",
    border: "1px solid white"

  },
  button_send:{
    margin: 10,
    marginBottom: "20px",
  
    left: "12%",
    
  },
  multilineColor:{
    color:'white',
    border: "1px solid white"
   
}
}));

function SendMessegeBarComp() {
  const classes = useStyle();
  const [socket] = useContext(SocketContext);
  const { dataChat, username } = useContext(ChatContext);
  const [dataChatVal, setDataChat] = dataChat;
  const [usernameVal] = username;

  const [msg, setMsg] = useState("");

  const sendMsg = () => {
    if (msg != "") {
      let receive = dataChatVal.participates.find(
        (user) => user != usernameVal
      );
      socket.emit("msg", {
        msg: msg,
        send: usernameVal,
        id: dataChatVal._id,
        receive: receive,
      });
      setMsg("");
    }
  };
  const ClickEnter = (e) => {
    if (e.key === "Enter") {
      sendMsg();
    }
  };
  const handleInput = (e) => {
    setMsg(e.target.value);
  };

  return (
    <div>
      <TextField
        placeholder="Typa a Message"
        variant="outlined"
        className={classes.textfield}
        onChange={handleInput}
        onKeyPress={ClickEnter}
        value={msg}
        size="small"
        InputProps={{
          className: classes.multilineColor
        }}
        focused
      />
      <Button className={classes.button_send} onClick={sendMsg} variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </div>
  );
}

export default SendMessegeBarComp;

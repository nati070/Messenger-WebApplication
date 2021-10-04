import { Button, Avatar } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import utils from "../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { ChatContext } from "../Contexts/ChatProvider";
import { SocketContext } from "../Contexts/SocketProvider";

const useStyles = makeStyles((theme) => ({
  grid: {
    border: "1px solid",
    height: 65,
    width: "100%",
    textAlign: "center",
    justifyContent: "unset",
    color: "white"
  },
  avatar_online: {
    backgroundColor: "green",
    width: 30,
    height: 30,
    marginLeft: "auto"
  },
  avatar_offline: {
    backgroundColor: "grey",
    width: 30,
    height: 30,
    marginLeft: "auto"
 
  },
}));

function FriendStatusComp(props) {
  const classes = useStyles();

  const { nameOfRoom, username, dataChat, conversation } =
    useContext(ChatContext);
  const [nameOfRoomVal, setNameOfRoom] = nameOfRoom;
  const [dataChatVal, setDataChat] = dataChat;
  const [usernameVal] = username;
  const [conversationVal, setConversation] = conversation;

  const [socket] = useContext(SocketContext);
  const [unreadMsgTotal, setUnreadMsgTotal] = useState(0);
  const [conversationRoom, setConversationRoom] = useState([]);
  const [dataChatCurrent, setDataChatCurrent] = useState([]);

  const [data, setData] = useState(true);

  useEffect(async () => {
    let data = await utils.getPrivateRoomInfo([
      props.friend.username,
      usernameVal,
    ]);
    let NumUnreadMsg = utils.getNumUnreadMsg(data.conversation, usernameVal);
    setUnreadMsgTotal(NumUnreadMsg);
    socket.emit("joinRoom", data._id);
    setDataChatCurrent(data);
    setConversationRoom(data.conversation);
    setData(true);
  }, [usernameVal]);

  useEffect(() => {
    socket.on("listenToMsg", (msg) => {
      if (msg.id == dataChatCurrent._id) {
        setConversationRoom([...conversationRoom, msg]);
        if (msg.id == dataChatVal._id) {
          setConversation([...conversationRoom, msg]);
          setUnreadMsgTotal(0);
        } else if (msg.send != usernameVal) {
          setUnreadMsgTotal(unreadMsgTotal + 1);
        }
      }
    });
    return () => {
      socket.off("listenToMsg");
    };
  }, [dataChatCurrent, conversationVal, conversationRoom, unreadMsgTotal]);

  const openRoom = async () => {
    setNameOfRoom(props.friend.username);
    setConversation(conversationRoom);
    setDataChat(dataChatCurrent);
    setUnreadMsgTotal(0); // seen all the msg
    console.log(dataChatCurrent);

    await utils.setReadAllMsgs(dataChatCurrent._id, usernameVal);
  };

  let statusColor =
    props.status == "connected"
      ? classes.avatar_online
      : classes.avatar_offline;
  return (
    <div>
    <Button className={classes.grid} onClick={openRoom}>

      <Avatar style={{  marginRight: "15px" }} />
      
      {props.friend.username}

      <Avatar className={statusColor}> {unreadMsgTotal == 0 ? "" : unreadMsgTotal}</Avatar>

    </Button>
    </div>
  );
}

export default FriendStatusComp;

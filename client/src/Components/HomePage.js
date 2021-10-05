import { Grid, Paper } from "@material-ui/core";

import React, { useEffect, useContext } from "react";
import utils from "../utils/utils";
import { ChatContext } from "../Contexts/ChatProvider";
import { SocketContext } from "../Contexts/SocketProvider";
import Background from "../backgroundImage/stars.jpg";
import FriendsListComp from "./FriendsList";
import ChatComp from "./Chat";
import SendMessegeBarComp from "./SendMessegeBar";
import TopBarComp from "./TopBar";

function HomePageComp(props) {
  const FriendsListPaper = {
    height: "100vh",
    //maxHeight: 200,
    overflow: "auto",
    // margin: "20px auto",
    // backgroundColor: '#282c34',
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    color: "white",
  };
  const userBarPaper = {
    height: "80px",
    overflow: "hidden",
    color: "white",

    fontStyle: "italic",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
  };

  const UsersChatPaper = {
    height: "calc(100vh - 140px)",
    overflow: "auto",
    backgroundColor: "#cccccc",
  };
  const TypeChatPaper = {
    height: "60px",
    overflow: "hidden",
    color: "white",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
  };
  const StartPage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    color: "white",
    textAlign: "center",
    padding: "20%",
  };

  const { nameOfRoom, username } = useContext(ChatContext);
  const [usernameVal, setUsername] = username;
  const [nameOfRoomVal] = nameOfRoom;
  const [socket] = useContext(SocketContext);

  useEffect(async () => {
    console.log("hello")
    console.log(usernameVal)
    let isHaveToken = await utils.isUserHaveToken();
    if (!isHaveToken) {
      props.history.push("/");
    }
    // utils.connectToSeverChat(username)
    if (socket && usernameVal != "") {
      socket.emit("EnterToOnlineList", usernameVal);
    }
  }, [socket, usernameVal]);

  useEffect(() => {
    if (props.location.state) {
      setUsername(props.location.state.username.toLowerCase());
    }
  }, [usernameVal]);

  const ChatsComps = () => {
    if (nameOfRoomVal != "") {
      return (
        <Grid item xs={9}>
          <Paper elevation={10} style={userBarPaper}>
            <TopBarComp />
          </Paper>
          <Paper elevation={10} style={UsersChatPaper}>
            <ChatComp />
          </Paper>
          <Paper elevation={10} style={TypeChatPaper}>
            <SendMessegeBarComp />
          </Paper>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={9} style={StartPage}>
          <h1>Hey Welcome to ChatApp!</h1>
        </Grid>
      );
    }
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <Paper elevation={10} style={FriendsListPaper}>
          <FriendsListComp username={usernameVal} />
        </Paper>
      </Grid>
      {ChatsComps()}
    </Grid>
  );
}

export default HomePageComp;

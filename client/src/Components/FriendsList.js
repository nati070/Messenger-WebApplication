import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  InputBase,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect, useContext } from "react";
import utils from "../utils/utils";
import { makeStyles } from "@material-ui/core/styles";

import FriendStatusComp from "./FriendStatus";

import { SocketContext } from "../Contexts/SocketProvider";
import { ChatContext } from "../Contexts/ChatProvider";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    marginTop: "5%",
    marginBottom: "5%",
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function FriendsListComp(props) {
  const classes = useStyles();

  const [socket] = useContext(SocketContext);
  const { username } = useContext(ChatContext);
  const [usernameVal] = username;

  const [listFriend, setListFriends] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchListFriends, setSearchListFriends] = useState([]);
  const [onlineList, setOnlineList] = useState([]);

  useEffect(async () => {
    if (usernameVal != "") {
      const dataUsers = await utils.getAllOthersUsers({
        username: usernameVal,
      });
      setSearchListFriends(dataUsers);
      setListFriends(dataUsers);
    }
  }, [usernameVal]);

  useEffect(() => {
    setSearchListFriends(
      listFriend.filter((user) => user.username.includes(searchText))
    );
    console.log(listFriend);
  }, [searchText]);

  useEffect(() => {
    if (socket) {
      socket.emit("getOnlineUsers");
      socket.on("OnlineUsers", (users) => {
        setOnlineList(users);
      });
    }
  }, [socket]);

  const onlineUsersList = searchListFriends.map((friend) => {
    let isOnline = onlineList.some(
      (friendOnline) => friendOnline.username == friend.username
    );
    if (isOnline) {  
      return (
        <FriendStatusComp key={friend._id} friend={friend} status="connected" />
      );
    }
  });

  const offlineeUsersList = searchListFriends.map((friend) => {
    let isOnline = onlineList.some(
      (friendOnline) => friendOnline.username == friend.username
    );
    if (!isOnline) {
      return (
        <FriendStatusComp
          key={friend._id}
          friend={friend}
          status="not connected"
        />
      );
    }
  });

  return (
    <Grid>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {onlineUsersList}
      {offlineeUsersList}
    </Grid>
  );
}

export default FriendsListComp;

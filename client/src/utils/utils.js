import axios from "axios";
import { io } from "socket.io-client";

let listOnline = [];

const isUserAuthorized = async (user) => {
  const user_json = await axios.post("http://localhost:8000/api/login", user);
  return user_json;
};

const saveToken = (token) => {
  sessionStorage["token"] = token;
};
const getToken = () => {
  return sessionStorage["token"];
};
const isUserHaveToken = async () => {
  const tokenData = await axios.get("http://localhost:8000/api/isHaveToken", {
    headers: {
      "x-access-token": sessionStorage["token"],
    },
  });
  const isAuth = tokenData.data.auth;
  return isAuth;
};

const setNewUser = async (user) => {
  await axios.post("http://localhost:8000/api/create-user", user);
};

const isUserExist = async (username) => {
  const isUserExist = await axios.post(
    "http://localhost:8000/api/find-username",
    username
  );
  return isUserExist.data.ans;
};

const getOnlineUsers = (socket) => {
  if (socket) {
    console.log(socket);
    socket.emit("getOnlineUsers");
    socket.on("OnlineUsers", (users) => {
      return users;
    });
  }
};

//get all the users into the FriendList component
const getAllOthersUsers = async (username) => {
  let users = await axios.post(
    "http://localhost:8000/api/get-all-other-users",
    username
  );
  return users.data;
};

const getPrivateRoomInfo = async (users) => {
  let dataRoom = await axios.post(
    "http://localhost:8000/api/get-users-data-room",
    users
  );
  return dataRoom.data;
};

const setReadAllMsgs = async (id, username) => {
  console.log(id);
  await axios.post("http://localhost:8000/api/set-read-all-msgs", {
    id: id,
    sender: username,
  });
};

const getNumUnreadMsg = (msgs, username) => {
  let count = 0;
  msgs.forEach((msg) => {
    if (msg.send != username && msg.isRead == false) {
      count++;
    }
  });
  return count;
};

export default {
  isUserAuthorized,
  saveToken,
  getToken,
  isUserHaveToken,
  setNewUser,
  isUserExist,
  getAllOthersUsers,
  getOnlineUsers,
  getPrivateRoomInfo,
  setReadAllMsgs,
  getNumUnreadMsg,
};
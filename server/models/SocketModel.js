const chatModel = require("../models/ChatsModel");

let onlineList = [];

exports.sockets = async (socket) => {
  socket.on("msg", async (msgDetails) => {
    
    socket.to(msgDetails.id).emit("listenToMsg", msgDetails);
    socket.emit("listenToMsg", msgDetails);
    isRead = false
    await chatModel.sendMsgtoPrivateRoom(
      msgDetails.send,
      msgDetails.msg,
      msgDetails.id,
      isRead
    );
  });

  socket.on("joinRoom", (id) => {
    socket.join(id);
  });
  socket.on("leaveRoom", (id) => {
    socket.leave(id);
  });

  socket.on("msgRecived", (userRecive) => {
    if(userRecive != msgDetails.send){
      isRead = true;
    }
  })


  socket.on("EnterToOnlineList", (username) => {
    if (!onlineList.some((user) => user == username)) {
      onlineList.push({ username: username, socketId: socket.id });
      socket.broadcast.emit("OnlineUsers", onlineList);
      console.log(onlineList);
    }
  });
  socket.on("getHistoryChat", async (id) => {
    let roomData = await chatModel.getChatRoomById(id);
    socket.emit("HistoryChat", roomData);
  });

  socket.on("getOnlineUsers", () => {
    socket.emit("OnlineUsers", onlineList);
    socket.broadcast.emit("OnlineUsers", onlineList);
  });

  socket.on("disconnect", () => {
    const userIndex = onlineList.findIndex((ele) => ele.socketId == socket.id);
    onlineList.splice(userIndex, 1);
    socket.broadcast.emit("OnlineUsers", onlineList);
    console.log("User Disconnect");
  });
};

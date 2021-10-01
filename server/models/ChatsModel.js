const chatsDal = require("../dals/ChatDal");

exports.sendMsgtoPrivateRoom = async (send , msg , id , isRead) => {
    room = await chatsDal.updateChatById(send , msg, id , isRead);
  return room;
};

exports.getChatRoomById = async (id) => {
  const room = await chatsDal.findChatById(id);
  return room;
};

exports.PrivateRoomInfo = async (users) => {
  let room = await chatsDal.findPrivateRoomByUsers(users);
  if (!room) {
    // not exist
    room = await chatsDal.createPrivateRoom(users);
    console.log("Room Created")
  }
  return room
};

exports.setReadAllMsgs = async (id , sender)=>{
  let unreadMsgs = await chatsDal.setReadAllMsgs(id,sender)
}


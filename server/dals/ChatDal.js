const privateChatsDBModel = require("../models/PrivateChatsDBModel");

exports.createPrivateRoom = (users) => {
  return new Promise((resolve, reject) => {
    const newRoom = privateChatsDBModel({
      participates: users,
    });
    newRoom.save((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

exports.findPrivateRoomByUsers = async (users) => {
  const filter = { participates: { $all: users } };
  return new Promise((resolve, reject) => {
    privateChatsDBModel.find(filter, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data[0]);
    });
  });
};
exports.updateChatById = (send, msg, id, isRead) => {
  console.log(msg);
  return new Promise((resolve, reject) => {
    privateChatsDBModel.findByIdAndUpdate(
      id,
      {
        $push: { conversation: { send: send, msg: msg, isRead: isRead } },
      },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

exports.findChatById = (id) => {
  return new Promise((resolve, reject) => {
    privateChatsDBModel.findById(id, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

exports.setReadAllMsgs = async (id, sender) => {
  let conversationData = new Promise((resolve, reject) => {
    privateChatsDBModel.findById(id, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.conversation);
    });
  });

  conversationData.then((conversation) => {
    conversation.map((msg) => (msg.isRead = (sender == msg.send && msg.isRead == false) ? false : true));
    return new Promise((resolve, reject) => {
      privateChatsDBModel.findByIdAndUpdate(id , { 
        conversation : conversation
      } , (err,data)=>{
        if(err){
          reject(err)
        }
        console.log("sad")
        resolve(data)
      })
    });
  });
};

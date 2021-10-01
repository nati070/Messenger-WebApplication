const usersDals = require("../dals/usersDal");

exports.validateUser = async (user) => {
  return await usersDals.findByUserAndPass(user);
};
exports.setUser = async (user) => {
  let dataUser = await usersDals.findByUsername(user.username); //if somone try todo post without the web

  if (dataUser.length == 0) {
    console.log(user);
    let res_user = await usersDals.setUser(user);
    return res_user; //user created!!
  }
  return "The user not Created";
};

exports.findUsername = async (username) => {
  let dataUser = await usersDals.findByUsername(username);
  if (dataUser.length > 0) {
    return true;
  }
  return false;
};

exports.getAllOtherUsers = async (username) => {
  let users = await usersDals.findOtherUsers(username);
  return users;
};

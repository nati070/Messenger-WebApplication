const userDBModel = require("../models/UsersDBModel");

exports.findByUserAndPass = (user) => {
  return new Promise((resolve, reject) => {
    userDBModel.find(
      { username: user.username.toLowerCase() , password: user.password },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

exports.setUser = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = new userDBModel({
      firstname: user.firstname.toLowerCase(),
      lastname: user.lastname.toLowerCase(),
      password: user.password,
      email: user.email.toLowerCase(),
      username: user.username.toLowerCase(),
    });

    newUser.save((err, data)=>{
        if(err){
            reject(err)
        }
        resolve(data)
    });
  });
};

exports.findByUsername = (username) => {
  return new Promise((resolve, reject) => {
    userDBModel.find({ username: username.toLowerCase()}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

exports.findOtherUsers = (username) => {
  return new Promise((resolve, reject) => {
    userDBModel.find({ username : { $ne : username.toLowerCase()}}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};


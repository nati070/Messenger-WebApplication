const express = require("express");
const router = express.Router();
const userModel = require("../models/usersModel");
const chatModel = require("../models/ChatsModel");
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.json({ auth: false, message: "Failed to Auhenticate No Token" });
  } else {
    jwt.verify(token, "jwtsecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed to Auhenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

router.route("/isHaveToken").get(verifyJWT, (req, res) => {
  res.json({ auth: true });
});


router.route("/login").post(async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  let user_data = await userModel.validateUser(user);
  if (user_data.length > 0) {
    const token = jwt.sign({ id: user_data.id }, "jwtsecret", {
      expiresIn: 10,
    });
    res.status(200).json({ auth: true, token: token});
  } else {
    res.json({ auth: false, message: "Wrong pasword or usename" });
  }
});

router.route("/home").get(verifyJWT, (req, res) => {
  res.json({ auth: true });
});

router.route("/create-user").post(async (req, res) => {
  try{
    await userModel.setUser(req.body);
    res.send("created user")
  }catch(err){
    throw "The user not created"
  }
});

router.route("/find-username").post(async (req, res) => {
  return res.json({ans : await userModel.findUsername(req.body.username)})
});

router.route("/send-msg").post((req, res)=>{
  //where to send??
})

router.route("/get-all-other-users").post(async (req, res) => {
  return res.json(await userModel.getAllOtherUsers(req.body.username))
});

router.route("/get-users-data-room").post(async (req, res) => {
  return res.json(await chatModel.PrivateRoomInfo(req.body))
});


router.route("/set-read-all-msgs").post(async (req, res) => {
  console.log("get in all set read")
  console.log(req.body)
  return res.json(await chatModel.setReadAllMsgs(req.body.id , req.body.sender))
});






module.exports = router;

const express = require("express");
const cors = require("cors");

const socketio = require("socket.io");
const http = require("http");

// const session = require('express-session')
let app = express();
require("./configs/usersDB");
require("./configs/chatsDB");
const bodyParser = require("body-parser");
const path = require("path");
// app.use(session([{secret : 'secret'}]))

app.use(
  cors({
    orgin: "*",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", require("./routes/login"));

const server = http.createServer(app); //make a http server
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  require('./models/SocketModel').sockets(socket)
});

server.listen(8000);

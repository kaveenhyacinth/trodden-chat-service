const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.on("connection", (socket) => {
  console.log("New Connection!!");
  socket.on("join", (chatData, cb) => {
    console.log("User joined");
    // console.log("Chat data", chatData);
    const { error, user } = addUser(chatData);
    if (error) return cb(error);

    socket.emit("message", {
      user: "Trodden",
      content: `${user.nomadName}, welcome to the ${user.roomName}'s Flash Trod™`,
    });

    socket.broadcast.to(user.roomId).emit("message", {
      user: "Trodden",
      content: `${user.nomadName} has joined`,
    });

    socket.join(user.roomId);

    cb();
  });

  socket.on("sendMessage", (data, cb) => {
    const user = getUser(data.nomadId);
    console.log("data", data);
    io.to(user.roomId).emit("message", {
      user: user.nomadName,
      content: data.message,
    });
    cb();
  });

  socket.on("left", (nomadId) => {
    console.log("User left");
    const user = removeUser(nomadId);
    console.log("removedUser", user);
    io.to(user.roomId).emit("message", {
      user: "Trodden",
      content: `${user.nomadName} has left`,
    });
  });
});

app.use(router);

server.listen(PORT, () =>
  console.log(`⚡  [Server is running on port ${PORT}]`)
);

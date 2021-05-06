const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("User joined");

  socket.on("join", (chatData, cb) => {
    // console.log("Chat data", chatData);
    const { error, user } = addUser({ id: socket.id, chatData });
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

  socket.on("sendMessage", (message, cb) => {
    const user = getUser(socket.id);
    io.to(user.roomId).emit("message", {
      user: user.nomadName,
      content: message,
    });
    cb();
  });

  socket.on("left", () => {
    console.log("User left");
  });
});

app.use(router);

server.listen(PORT, () =>
  console.log(`⚡  [Server is running on port ${PORT}]`)
);

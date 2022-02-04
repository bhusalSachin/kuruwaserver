const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const userRouter = require("./routes/user");
const passport = require("passport");

//connecting to mongodb using mongoose
require("./models/db");

const port = process.env.PORT || 8000;

//main app
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  trasports: ["websocket"],
});

//using middlewares
app.use(express.json());
app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use(userRouter);

//default route
app.get("/", (req, res) => {
  console.log("got request");
  res.json({ success: true, message: "Welcome to the app server" });
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("callkuruwa", (data) => {
    io.emit("receiveacall", data);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

//listening to the port
server.listen(port, () => {
  console.log("listening to the port 8000");
});

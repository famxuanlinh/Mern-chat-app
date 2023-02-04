const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const db = require("./config/db");
const userRouters = require("./routes/userRouters");
const chatRouters = require("./routes/chatRouters");
const messageRouters = require("./routes/messageRouters");
const { notFound, errorHandler } = require("./middlewares/errorMidleware");
const cors = require("cors");
const PORT = process.env.PORT || 3005;

dotenv.config();
db.connect();
const app = express();
app.use(cors());
app.use(express.json()); //To accept JSON data

// route(app);
app.use("/api/chat", chatRouters);
app.use("/api/user", userRouters);
app.use("/api/message", messageRouters);

app.get("/", (req, res) => {
  res.send("API running!!!");
});

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server starting port ${PORT}...`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connect to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room" + room);
  });

  socket.on("new message", (newMessageReceived) => {

    var chat = newMessageReceived.data.chat;
    

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      // if (user._id == newMessageReceived.data.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageReceived.data);
    });
  });
});

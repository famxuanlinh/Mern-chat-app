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

app.listen(PORT, console.log(`Server starting port ${PORT}...`));



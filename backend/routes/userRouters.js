var express = require("express");
const { registerUser, authUser } = require("../controllers/userController");

const router = express.Router();

// const userController = require('../controllers/userController');

router.post("/login", authUser);
router.route("/").post(registerUser);

// app.get("/api/chat", (req, res) => {
//     res.send(chats);
//   });

//   app.get("/api/chat/:id", (req, res) => {
//     const singleChat = chats.find((user) => user._id === req.params.id);
//     res.send(singleChat);
//   });

module.exports = router;

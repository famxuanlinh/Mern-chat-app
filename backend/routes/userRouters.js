var express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();


router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router.route("/").get(protect, allUsers);

// app.get("/api/chat", (req, res) => {
//     res.send(chats);
//   });

//   app.get("/api/chat/:id", (req, res) => {
//     const singleChat = chats.find((user) => user._id === req.params.id);
//     res.send(singleChat);
//   });

module.exports = router;

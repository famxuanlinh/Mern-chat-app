var express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/login", authUser);
router.route("/").post(registerUser).get(protect, allUsers);

// app.get("/api/chat", (req, res) => {
//     res.send(chats);
//   });

//   app.get("/api/chat/:id", (req, res) => {
//     const singleChat = chats.find((user) => user._id === req.params.id);
//     res.send(singleChat);
//   });

module.exports = router;

const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// require("dotenv").config();

// dotenv.config();

const generateToken = (id) => {
  // console.log("process.env.JWT_SECRET", process.env);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;

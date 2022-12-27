const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

//connect to database
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Mern-chat-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log("Connected mongoose successfully");
  } catch (err) {
    console.log(err.message);
    console.log("Connected mongoose failed");
    process.exit();
  }
}

module.exports = { connect };

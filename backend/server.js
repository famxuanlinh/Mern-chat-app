const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const db = require("./config/db");
// const route = require("./routes");
const userRouters = require("./routes/userRouters");
const { notFound, errorHandler } = require("./middlewares/errorMidleware");

const PORT = process.env.PORT || 3004;

dotenv.config();
db.connect();
const app = express();

app.use(express.json()); //To accept JSON data

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});



// route(app);
app.use("/api/user", userRouters);

app.get("/", (req, res) => {
  res.send("API running!!!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server starting port ${PORT}...`));

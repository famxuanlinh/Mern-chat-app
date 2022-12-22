const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3004;

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello backend");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((user) => user._id === req.params.id);
  res.send(singleChat);
});

app.listen(PORT, console.log(`Server starting port ${PORT}...`));

// const path = require("path");
// const express = require("express");
// //Sử dụng phương thức PUT trong form behaivior
// var methodOverride = require("method-override");
// const morgan = require("morgan");
// const handlebars = require("express-handlebars");
// const SortMiddlewares = require("./app/middlewares/SortMiddlewares");

// const route = require("./routes");
// const db = require("./app/config/db");

// // Connect to DB
// db.connect();

// const app = express();
// const port = 3001;

// app.use(express.static(path.join(__dirname, "public")));

// //middleware để xử lý dữ liệu từ form-data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.
// app.use(methodOverride("_method"));

// //Custom SortMiddlewares
// app.use(SortMiddlewares);

// //http logger
// app.use(morgan("combined"));

// //Template engine
// app.engine(
//   "hbs",
//   handlebars.engine({
//     extname: "hbs",
//     helpers: {
//       sum: (a, b) => a + b,
//       sortable: (field, sort) => {
//         const sortType = field === sort.column ? sort.type : "default";

//         const types = {
//           default: "desc",
//           asc: "desc",
//           desc: "asc",
//         };

//         const icons = {
//           default: "fa-solid fa-sort",
//           asc: "fa-solid fa-arrow-up-wide-short",
//           desc: "fa-solid fa-arrow-down-wide-short",
//         };

//         const icon = icons[sortType];
//         const type = types[sortType];

//         return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
//       },
//     },
//   })
// );
// app.set("view engine", "hbs");
// app.set("views", "./src/resources/views");

// //Route
// route(app);

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

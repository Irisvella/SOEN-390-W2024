var express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const signUpRouter = require("./routes/signup");
const loginRouter = require("./routes/login");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);

const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;

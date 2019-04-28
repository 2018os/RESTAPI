const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/auth", authRouter);

// DB / sequelize 연결

const models = require("./models/index.js");

models.sequelize
  .sync()
  .then(() => {
    console.log(" DB 연결 성공");
  })
  .catch(err => {
    console.log("연결 실패");
    console.log(err);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  let apiError = err;

  if (!err.status) {
    apiError = createError(err);
  }

  // set locals, only providing error in development
  res.locals.message = apiError.message;
  res.locals.error = process.env.NODE_ENV === "development" ? apiError : {};

  // render the error page
  return res.status(apiError.status).json({ message: apiError.message });
});

module.exports = app;

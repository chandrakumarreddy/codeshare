require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");

// passport js
require("./helpers/passport");
//database connection
const { connect } = require("./helpers/db");
connect();
// routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const { sessionSecret } = process.env;

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const sess = {
  resave: false,
  saveUninitialized: false,
  secret: sessionSecret,
  cookie: {},
};

app.use(
  session({
    ...sess,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.username = req.user.name;
  }
  next();
});

app.use("/", indexRouter);
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

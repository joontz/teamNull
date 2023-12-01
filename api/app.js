var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var testAPIRouter = require("./routes/testAPI");
var signupRouter = require("./routes/signup");
var checkTokenRouter = require("./routes/checkToken");
var loginRouter = require("./routes/login");
var checkAdminRouter = require("./routes/checkAdmin");
var applicationRouter = require("./routes/apply");
var applications = require("./routes/applications");
var addCourse = require('./routes/addCourse');
var courses = require('./routes/courses');
var removeCourse = require('./routes/removeCourse');
var logout = require('./routes/logout')

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

//cloud mongo connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`mongo connection successful ${uri}`);
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/signup", signupRouter);
app.use("/checktoken", checkTokenRouter);
app.use("/checkAdmin", checkAdminRouter);
app.use("/login", loginRouter);
app.use("/apply", applicationRouter);
app.use("/applications", applications);
app.use("/addCourse", addCourse);
app.use("/removeCourse", removeCourse);
app.use("/courses", courses);
app.use("/logout", logout)


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

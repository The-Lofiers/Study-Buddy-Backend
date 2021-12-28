var createError = require("http-errors");
var compression = require("compression");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
require("dotenv").config({ path: "./.env" });
var cors = require("cors");
// console.log(process.env);
app.use(cors());
// compress all requests
app.use(compression()); 
app.use(logger("dev")); // log every request to the console from morgan
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(cookieParser()); // parse cookies
app.use(express.static(path.join(__dirname, "public"))); // set the static files location

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

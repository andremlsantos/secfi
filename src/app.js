const express = require("express");
const morgan = require("morgan");
const parser = require("body-parser");
const app = express();

const connection = require("../src/helpers/connection")
const userRoutes = require("../src/controllers/UserController");

// for logging
app.use(morgan("dev"));

// for extracting request body
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// incoming request
app.use("/users", userRoutes);

// request not supported
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// exceptions on application
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message }
  });
});

module.exports = app;

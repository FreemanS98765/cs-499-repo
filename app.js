const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const bodyParser = require("body-parser");
require("./app_api/config/db");

// Import routes
const apiRouter = require("./app_api/routes/index");

const app = express();

/**
 * Set up view engine to render server-side views.
 * Handlebars (hbs) is used as the templating engine.
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

/**
 * Set up middleware for logging, parsing, and serving static files.
 */
app.use(logger("dev"));

// Body parser middleware - handles JSON and URL encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Define API routes.
 * All routes defined in the `apiRouter` are prefixed with `/api`.
 * 
 * The `cors` middleware is used to enable CORS for the API.
 */
app.use(
  "/api",
  cors({
    origin: "http://localhost:4200", // Allow requests from this origin
    optionsSuccessStatus: 200, // Success status for preflight requests
  }),
  apiRouter
);

/**
 * Catch 404 and forward to error handler.
 * If no route matches, create a 404 error and pass it to the error handler.
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Error handler middleware.
 * Handles errors by rendering an error page and providing error details.
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");

  // Catch unauthorized error and create 401
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  }
});

module.exports = app;
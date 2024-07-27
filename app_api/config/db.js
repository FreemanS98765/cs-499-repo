const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/inventoryapp";

const readLine = require("readline");

// Build the connection string and set the connection timeout.
// timeout is in milliseconds
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, {}), 1000);
};

// Event listeners for MongoDB connection
mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Windows specific listener
if (process.platform === "win32") {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("SIGINT", () => {
    process.emit("SIGINT");
  });
}

// Close the Mongoose connection when the Node process ends
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  gracefulShutdown("Heroku app shutdown", () => {
    process.exit(0);
  });
});

// Make initial connection to DB
connect();

// Import Mongoose schemas
require("../models/InventoryItem");
require("../models/Notification");
require("../models/User");

module.exports = mongoose;

const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const connectDB = require("./config/db");
const path = require("path");

dotenv.config({ path: "config/config.env" });

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exceptions");
  process.exit(1);
});

// Database connection
connectDB();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Server static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.resolve(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Connection server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

// Handle Unhandle Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shuttion down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

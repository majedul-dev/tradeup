const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const errorMiddleware = require("./middlewares/errors");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const productRouter = require("./routes/products");
const offerRouter = require("./routes/offer");
const conversationRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");

app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(helmet());

// API routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/offers", offerRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;

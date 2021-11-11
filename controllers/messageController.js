const Message = require("../models/Message");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Create message
exports.createMessage = catchAsyncErrors(async (req, res, next) => {
  const newMessage = new Message(req.body);

  const message = await newMessage.save();
  res.status(200).json({
    success: true,
    message,
  });
});

// Get message
exports.getMessage = catchAsyncErrors(async (req, res, next) => {
  const message = await Message.find({
    conversationId: req.params.conversationId,
  }).populate("sender", ["avatar", "username"]);

  if (!message) {
    return next(new ErrorHandler("Message not found", 404));
  }

  res.status(200).json({
    success: true,
    message,
  });
});

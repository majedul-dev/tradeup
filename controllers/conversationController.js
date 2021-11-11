const Conversation = require("../models/Conversation");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// @route   POST api/conversation
// @desc    New conversation
// @access  Private
exports.createConversation = catchAsyncErrors(async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  const conversation = await newConversation.save();

  res.status(200).json({
    success: true,
    conversation,
  });
});

// @route   POST api/conversation/:userId
// @desc    Get conversation of a user
// @access  Private
exports.getUserConversation = catchAsyncErrors(async (req, res, next) => {
  const conversation = await Conversation.find({
    members: { $in: [req.params.userId] },
  });

  if (!conversation) {
    return next(new ErrorHandler("Conversation not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    conversation,
  });
});

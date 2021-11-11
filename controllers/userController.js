const User = require("../models/User");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendJwtToken");

// @route   GET api/users/admin/allusers
// @desc    Get all users by admin
// @access  Private
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// @route   GET api/users/admin/user/:id
// @desc    Get user details by admin
// @access  Private
exports.getUserDetailsById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User dose not found with the id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// @route   GET api/users/user/:id
// @desc    Get user
// @access  Public
exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User dose not found with the id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// @route   PUT api/users/admin/user/:id
// @desc    Update user info by admin
// @access  Private
exports.updateUserByAdmin = catchAsyncErrors(async (req, res, next) => {
  const newUserDate = {
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
  };

  // Update avatar: TODO

  const user = await User.findByIdAndUpdate(req.params.id, newUserDate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// @route   DELETE api/users/admin/user/:id
// @desc    Delete user by admin
// @access  Private
exports.deleteUserByAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User dose not found with the id ${req.params.id}`, 404)
    );
  }

  // Remove avatar from cloudinary - TODO

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted by admin",
  });
});

// @route   GET api/users/me
// @desc    Get current logged in user details
// @access  Private
exports.getUserProfile = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// @route   PUT api/users/me/password/update
// @desc    Change user's password
// @access  Private
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check Old password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect"));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// @route   PUT api/users/me/profile/update
// @desc    Update profile info
// @access  Private
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserDate = {
    username: req.body.username,
    email: req.body.email,
    description: req.body.description,
  };

  // Update avatar: TODO

  const user = await User.findByIdAndUpdate(req.user.id, newUserDate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

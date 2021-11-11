const Offer = require("../models/Offer");
const Product = require("../models/Product");
const User = require("../models/User");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary").v2;

exports.createOffer = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.user = req.user.id;
  req.body.product = req.params.id;

  const newOffer = new Offer(req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const offer = await newOffer.save();

  await User.findByIdAndUpdate(req.user.id, {
    $push: { offers: offer._id },
  });

  await Product.findByIdAndUpdate(req.params.id, {
    $push: { custommerOffers: offer._id },
  });

  res.status(200).json({
    success: true,
    offer,
  });
});

exports.getOffers = catchAsyncErrors(async (req, res, next) => {
  const offers = await Offer.find()
    .populate("user", ["username", "avatar"])
    .populate("product", ["name", "exchangeWith", "exchangePrice", "images"]);

  res.status(200).json({
    success: true,
    offers,
  });
});

// @route   GET api/offers/my/:productId
// @desc    Get my product's offers
// @access  Private
exports.getMyProductOffers = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).populate(
    "custommerOffers"
  );

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  if (product.user.toString() !== req.user.id) {
    return next(new ErrorHandler("Permission denied", 401));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.getOfferById = catchAsyncErrors(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id)
    .populate("user", ["username", "avatar"])
    .populate("product");

  if (!offer) {
    return next(new ErrorHandler("Offer not found", 404));
  }

  res.status(200).json({
    success: true,
    offer,
  });
});

// @route   GET api/offers/my
// @desc    Get my all offers
// @access  Private

exports.getMyOffers = catchAsyncErrors(async (req, res, next) => {
  const allOffers = await Offer.find().populate("product");

  const offers = allOffers.filter(
    (item) => item.user.toString() === req.user.id
  );

  if (!offers) {
    return next(ErrorHandler("Offers not found", 404));
  }

  res.status(200).json({
    success: true,
    offers,
  });
});

// @route   DELETE api/offers/:id
// @desc    Delete an offer by ID
// @access  Private
exports.deleteOffer = catchAsyncErrors(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);

  if (offer.user.toString() !== req.user.id) {
    return next(
      new ErrorHandler("You are not parmitted to delete this offer", 401)
    );
  }

  await offer.remove();

  res.status(200).json({
    success: true,
    message: "Óffer deleted successfully",
  });
});

// @route   PUT api/offers/:id
// @desc    Update status
// @access  Private
exports.trackOffer = catchAsyncErrors(async (req, res, next) => {
  if (!req.user.id) {
    return next(new ErrorHandler("You are not authorized", 401));
  }

  const offer = await Offer.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    offer,
  });
});

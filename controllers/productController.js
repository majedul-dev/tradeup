const User = require("../models/User");
const Product = require("../models/Product");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary").v2;

// @route   GET api/products/getall
// @desc    Get all products
// @access  Public
exports.allProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(
    Product.find().select("-custommerOffers").sort({ createdAt: "desc" }),
    req.query
  )
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    productCount,
    resPerPage,
    products,
  });
});

// @route   GET api/products/getsingle/:id
// @desc    Get single product by id
// @access  Public
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("user", [
    "username",
    "avatar",
  ]);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.json({
    success: true,
    product,
  });
});

// @route   GET api/products/my
// @desc    Get my products
// @access  Private
exports.getOwnProducts = catchAsyncErrors(async (req, res, next) => {
  const allProducts = await Product.find();

  const products = allProducts.filter(
    (item) => item.user.toString() === req.user.id
  );

  if (!products) {
    return next(ErrorHandler("Products not found", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

// // @route   GET api/products/my/:userId
// // @desc    Get user's products offers
// // @access  Private
// exports.getMyProductOffers = catchAsyncErrors(async (req, res, next) => {
//   const product = await Product.findById(req.params.id).populate("user", [
//     "username",
//     "avatar",
//   ]);

//   if (!product) {
//     return next(new ErrorHandler("Product not found", 404));
//   }

//   res.status(200).json({
//     success: true,
//     product,
//   });
// });

// @route   GET api/products/:userId
// @desc    Get user's products
// @access  Public
exports.getUsersProductsByUserId = catchAsyncErrors(async (req, res, next) => {
  const allProducts = await Product.find();

  const products = allProducts.filter(
    (item) => item.user.toString() === req.params.userId
  );

  if (!products) {
    return next(ErrorHandler("Products not found", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

// @route   POST api/products/create
// @desc    Create product
// @access  Private
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
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

  const product = new Product(req.body);

  const createdProduct = await product.save();

  await User.findByIdAndUpdate(req.user.id, {
    $push: { products: createdProduct._id },
  });

  res.status(200).json({
    success: true,
    createdProduct,
  });
});

// @route   PUT api/products/:id
// @desc    Update logged user's product
// @access  Private
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(ErrorHandler("Product not found", 404));
  }

  if (product.user.toString() !== req.user.id) {
    return next(
      new ErrorHandler("The user is not allowed to update the product"),
      401
    );
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
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
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    updatedProduct,
  });
});

// @route   DELETE api/products/:id
// @desc    Delete logged user's product
// @access  Private
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(ErrorHandler("Product not found", 404));
  }

  if (product.user.toString() !== req.user.id) {
    return next(
      new ErrorHandler("The user is not allowed to delete the product"),
      401
    );
  }

  // Deleting images associated with the product
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

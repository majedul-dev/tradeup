const { Schema, model } = require("mongoose");

const productScema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [200, "Product name should be including 200 characters"],
    },
    exchangeWith: {
      type: String,
      required: [true, "Product name is required"],
      maxlength: [200, "Product name should be including 200 characters"],
    },
    exchangePrice: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Please select category for this product"],
      enum: {
        values: [
          "Electronics",
          "vehicles",
          "Computers",
          "camera",
          "House",
          "Furnitures",
        ],
      },
    },
    estimatedShippingDay: {
      type: Date,
      required: [true, "Shipping date is required"],
    },
    description: {
      type: String,
      maxlength: 2000,
      required: [true, "Description is required"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    addressOne: {
      type: String,
      required: [true, "Address one is required"],
    },
    addressTwo: {
      type: String,
      required: [true, "Address two is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    custommerOffers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Product", productScema);

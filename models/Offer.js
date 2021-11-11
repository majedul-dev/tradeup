const { Schema, model } = require("mongoose");

const offerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    name: {
      type: String,
      required: true,
      maxlength: [200, "Product name should including 200 characters"],
    },
    phone: {
      type: String,
      required: true,
      maxlength: [30, "Phone number should including 30 characters"],
    },
    description: {
      type: String,
      required: true,
      maxlength: [5000, "Description should including 5000 characters"],
    },
    status: {
      type: String,
      default: "pending",
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
  },
  { timestamps: true }
);

module.exports = model("Offer", offerSchema);

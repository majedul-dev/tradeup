const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);

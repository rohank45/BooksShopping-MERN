const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  photo: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
  googleId: {
    type: String,
  },
  myOrders: [
    {
      rank: {
        type: String,
      },
      book_image: {
        type: String,
      },
      title: {
        type: String,
      },
      price: {
        type: Number,
      },
      author: {
        type: String,
      },
      orderStatus: {
        type: String,
        default: "placed",
      },
      paymentToken: {
        type: String,
        default: "cod",
      },
      createdAt: {
        type: Date,
        immutable: true,
        default: Date.now,
      },
    },
  ],
});

const googleUser = mongoose.model("GoogleUser", userSchema);
module.exports = googleUser;

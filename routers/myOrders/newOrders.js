const express = require("express");
const router = express.Router();
const isUserLogin = require("../../middleware/isUserLogin");
const User = require("../../model/userSchema");

router.post("/buy/book", isUserLogin, async (req, res) => {
  try {
    const { rank, book_image, title, price, author } = req.body;

    const myOrders = {
      rank,
      book_image,
      title,
      price,
      author,
    };

    const loginUser = await User.findOne({ email: req.user.email });
    loginUser.myOrders.unshift(myOrders);
    await loginUser.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

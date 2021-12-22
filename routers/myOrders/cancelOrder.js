const express = require("express");
const router = express.Router();
const isUserLogin = require("../../middleware/isUserLogin");
const User = require("../../model/userSchema");

router.post("/cancel/book", isUserLogin, async (req, res) => {
  try {
    // const loginUser = await User.findOne({ email: req.user.email });
    // loginUser.myOrders.pull({ rank: req.body.rank });
    // await loginUser.save();

    await User.findOneAndUpdate(
      {
        email: req.user.email,
      },
      {
        $pull: {
          myOrders: { rank: req.body.rank },
        },
      }
    );

    res.status(201).json({ message: "Order cancelled successfully!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

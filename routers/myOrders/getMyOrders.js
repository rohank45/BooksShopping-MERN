const express = require("express");
const router = express.Router();

const isUserLogin = require("../../middleware/isUserLogin");
const User = require("../../model/userSchema");

router.get("/myorders", isUserLogin, async (req, res) => {
  try {
    const data = await User.findOne({ email: req.user.email });

    res.status(201).json({ data: data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

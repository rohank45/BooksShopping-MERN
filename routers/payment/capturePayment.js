const express = require("express");
const router = express.Router();
const isUserLogin = require("../../middleware/isUserLogin");
const User = require("../../model/userSchema");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/capture/payment", isUserLogin, async (req, res) => {
  try {
    await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "inr",

      metadata: { integration_check: "accept_a_payment" },
    });

    // console.log("card details", req.body.token.card); id, name, address, brand, country, expiry.
    //paymentToken = req.body.token.id;

    const loginUser = await User.findOne({ email: req.user.email });
    const order = loginUser.myOrders.find((e) => e.rank === req.body.rank);
    order.paymentToken = req.body.token.id;
    await loginUser.save();

    res.status(201).json({ message: "Payment Success!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

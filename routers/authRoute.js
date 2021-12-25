const express = require("express");
const router = express.Router();
const passport = require("passport");
require("./passport");
const isUserLogin = require("../middleware/isUserLogin");

// const localStorage = require("localStorage");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://buy-books.herokuapp.com/auth/google",
  }),
  (req, res) => {
    try {
      res.redirect("https://buy-books.herokuapp.com/");
      res.send(req.user);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/auth/profile", isUserLogin, (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/auth/logout", (req, res) => {
  try {
    req.session = null;
    req.logout();
    res.redirect("https://buy-books.herokuapp.com/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

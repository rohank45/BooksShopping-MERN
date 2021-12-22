const isUserLogin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Login first to access this page!" });
  }
};

module.exports = isUserLogin;

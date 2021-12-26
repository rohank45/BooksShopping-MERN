require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routers/passport");
require("./model/userSchema");
require("./routers/passport");
const databse = require("./config/database");
databse.call();

const cors = require("cors");
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

//passport cookie session
const passport = require("passport");
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [process.env.PASSPORT_SECRET_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const authRoute = require("./routers/authRoute");
app.use("/", authRoute);

//saving new order details in db
const newOrders = require("./routers/myOrders/newOrders");
app.use("/", newOrders);

//removing cancel order details from db
const cancelOrder = require("./routers/myOrders/cancelOrder");
app.use("/", cancelOrder);

//getting all orders details from db
const getMyOrders = require("./routers/myOrders/getMyOrders");
app.use("/", getMyOrders);

//capture payment route
const capturePayment = require("./routers/payment/capturePayment");
app.use("/", capturePayment);

// ----------------- production --------------------------
// const path = require("path");

// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
// ----------------- production --------------------------

app.listen(process.env.PORT, () => {
  console.log("server started...");
});

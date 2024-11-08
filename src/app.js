const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  // whitelisting this domain as it was not https so cookies was not getting stored on browser application; on broswer in acios we have to pass withCredentials:true
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/user", userRouter);

// first connect DB then listen to server
connectDB()
  .then(() => {
    console.log("Connected Mongoose");
    app.listen(8080, () => {
      console.log("server running");
    });
  })
  .catch((err) => {
    console.log(err, "Error Mongoose connection");
  });

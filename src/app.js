const express = require("express");
const connectDB = require("./config/database");
const app = express();
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    // Encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10); // 10 is dalt; number of rounds
    // creating new instance of User model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    // Almost all mongoose function return promise therefore we have to use await to handle it
    await user.save();
    res.send("user addded successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    if (!validator.isEmail(email)) throw new Error("Not valid email");
    const passwordValid = await user.validatePassword(password);
    if (passwordValid) {
      // Create JWT token
      const token = await user.getJWT();
      // Add token to cookie & send the response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      }); // Expires in 8 days
      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

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

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");

app.use(express.json());

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
    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid) {
      res.send("User logged in successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    // const users = await User.find({ email }); // find all user with this email
    // if (users.length === 0) res.status(404).send("User not found");
    // else res.send(users);
    const user = await User.findOne({ email }); // find one 1st user with this email
    if (!user) res.status(404).send("User not found");
    else res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find(); // find all users
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId); // read documentation of findByIdAndDelete
    res.send("User deleted");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["skills", "photoUrl", "about", "age", "gender"]; //others keys won't be allowed other than these
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills?.length > 10)
      throw new Error("Skills can not be more than 10");
    // const user = await User.findByIdAndUpdate({ email: req.body.email }, data, {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after", // return the data that was before the update
      runValidators: true, // it will run validations in Schema
    });
    console.log(user);
    res.send("user updted successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED : " + err.message);
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

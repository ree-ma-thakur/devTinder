const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // creating new instance of User model
  const user = new User(req.body);
  // Almost all mongoose function return promise therefore we have to use await to handle it
  try {
    await user.save();
    res.send("user addded successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    // const user = await User.findByIdAndUpdate({ email: req.body.email }, data, {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after", // return the data that was before the update
      runValidators: true, // it will run validations in Schema
    });
    console.log(user);
    res.send("user updted successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED" + err.message);
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

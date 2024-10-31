const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Reema",
    lastName: "Thakur",
    email: "reema@gmail.com",
    password: "Reema@123",
  };
  // creating new instance of User model
  const user = new User(userObj);
  // Almost all mongoose function return promise therefore we have to use await to handle it
  try {
    await user.save();
    res.send("user addded successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
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

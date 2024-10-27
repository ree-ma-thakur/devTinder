const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  try {
    // logic of DB call & get user data
    throw new Error("test errror");
    res.send("user data sent");
  } catch (err) {
    res.status(501).send("Error, contact suppor");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(501).send("Something went wrong");
  }
});

app.listen(8080, () => {
  console.log("server running");
});

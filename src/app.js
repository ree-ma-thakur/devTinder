const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// Auth middleware
app.use("/admin", adminAuth);

// We can directly add middleware here also
app.get("/user", userAuth, (req, res) => {
  res.send("User list");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User deleted");
});

app.listen(8080, () => {
  console.log("server running");
});

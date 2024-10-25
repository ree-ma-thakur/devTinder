const express = require("express");

const app = express();

// handle the requests; request handler function; this takes route, callback function that send response
app.use("/", (req, res) => {
  res.send("Dashboard response");
});

app.use("/test", (req, res) => {
  res.send("Test from server");
});

app.use("/hello", (req, res) => {
  res.send("Hellooooo from server");
});

// listen to request at port, callback fun that will be called when server is up & running
app.listen(8080, () => {
  console.log("server running");
});

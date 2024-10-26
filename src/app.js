const express = require("express");

const app = express();

// .get() will match only get request for that mentioned route
app.get("/user", (req, res) => {
  res.send({ firstName: "Reema" });
});

app.post("/user", (req, res) => {
  // logic to save data to DB
  res.send("Data saved successfully");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted successfully");
});

// handle the requests; request handler function; this takes route, callback function that send response
// .use() will match all http methods for that route mentioned
app.use("/test", (req, res) => {
  res.send("Test from server");
});

// listen to request at port, callback fun that will be called when server is up & running
app.listen(8080, () => {
  console.log("server running");
});

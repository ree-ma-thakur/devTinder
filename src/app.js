const express = require("express");

const app = express();

// .get() will match only get request for that mentioned route
// http://localhost:8080/user/10/Reema
app.get("/user/:userId/:name", (req, res) => {
  console.log(req.params); // to get params passed in request
  res.send({ firstName: "Reema" });
});

// http://localhost:8080/user?id=10&userId=14
app.get("/user", (req, res) => {
  console.log(req.query); // to get query passed in request
  res.send({ firstName: "Reema" });
});

// will work for abc route & ac route as well as b is optional here
app.get("/ab?c", (req, res) => {
  res.send({ firstName: "Reema" });
});

// will work for xyz, xyyyyyz, y can be of any count but x & z only of one count
app.get("/xy+z", (req, res) => {
  res.send({ firstName: "Reema" });
});

// will match mnREEMAop, mnop, mnasdabhbaop, anything between mn & op
app.get("/mn*op", (req, res) => {
  res.send({ firstName: "Reema" });
});

// we can add patterns as well abcd or ad, bc is optional
app.get("/a(bc)?d", (req, res) => {
  res.send({ firstName: "Reema" });
});

// we can add regex as well, any route having r in between work for this
app.get("/r/", (req, res) => {
  res.send({ firstName: "Reema" });
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

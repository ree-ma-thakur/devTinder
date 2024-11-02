const express = require("express");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", (req, res) => {
  const user = req.user;
  res.send(`${user.firstName} sent the connection request!`);
});

module.exports = requestRouter;

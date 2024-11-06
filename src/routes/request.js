const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      // Allowed status
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status))
        return res
          .status(400)
          .json({ message: `Invalid status type : ${status}` });
      // If toUserId exists in User DB
      const toUser = await User.findById(toUserId);
      if (!toUser) return res.status(400).json({ message: "User not found!" });
      // If there is existing connection request(from A to B or already B to A)
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest)
        return res
          .status(400)
          .json({ message: "Connection request already exists!" });
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send(`ERROR : ${err.message}`);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      // Allowed status should be accepted or rejected
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status is not allowed" });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        // Request id of connection should be valid(in DB)
        _id: requestId,
        // Reuqest from Reema to Vansh; then Vansh should be logged in to review the request
        toUserId: loggedInUser?._id,
        // In connectionRequest DB, there should be interested status then only we can accept if status is ignored then we should never able to see the user
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: `Connection request ${status}`, data });
    } catch (err) {
      res.status(400).send(`ERROR : ${err.message}`);
    }
  }
);

module.exports = requestRouter;

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

module.exports = requestRouter;

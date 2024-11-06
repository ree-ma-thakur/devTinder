const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl about skills";

// Get all the PENDING connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser?._id,
        status: "interested",
      })
      // populate the list, if we don't pass array or string then whole object will be populated from user collection
      .populate("fromUserId", USER_SAFE_DATA); // We can write in string as well with space separated
    // .populate("fromUserId", ["firstName", "lastName"]); // Array format
    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send(`ERROR : ${err.message}`);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // accepted status & loggedinuser id is either fromUserId or toUserId
    const connections = await connectionRequest
      .find({
        status: "accepted",
        $or: [
          { fromUserId: loggedInUser?._id },
          { toUserId: loggedInUser?._id },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connections?.map((row) => {
      if (row?.fromUserId?._id.toString() === loggedInUser?._id.toString())
        return row?.toUserId;
      else return row?.fromUserId;
    });
    res.json({
      message: "Connections fetched successfully",
      data,
    });
  } catch (err) {
    res.status(400).send(`ERROR : ${err.message}`);
  }
});

module.exports = userRouter;

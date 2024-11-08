const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl about skills";

// Get all the PENDING connection request for the logged in user
userRouter.get("/requests/received", userAuth, async (req, res) => {
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

userRouter.get("/connections", userAuth, async (req, res) => {
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

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req?.query?.page || 1);
    let limit = parseInt(req?.query?.limit || 10);
    limit = limit > 50 ? 50 : limit;
    // User should not see: own card, connections, ignored people, already sent the connection request
    const loggedInUser = req.user;
    // Find all connection requests (sent/received)
    const connectionRequests = await connectionRequest
      .find({
        $or: [
          { fromUserId: loggedInUser?._id },
          { toUserId: loggedInUser?._id },
        ],
      })
      .select("fromUserId toUserId");
    console.log(connectionRequests);

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser?._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ message: "Users fetched", data: users });
  } catch (err) {
    res.status(400).send(`ERROR : ${err.message}`);
  }
});

module.exports = userRouter;

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read token from req cookies
    const { token } = req.cookies;
    if (!token) throw new Error("Token is not valid");
    // Validate the token
    const { _id } = await jwt.verify(token, "DEV@Tinder14");
    // Find the user
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");
    req.user = user; // Attaching user object to request
    next();
  } catch (err) {
    res.status(400).send("Err : " + err.message);
  }
};

module.exports = { userAuth };

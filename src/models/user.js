const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email");
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value))
          throw new Error("Not strong password");
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is incorrect gender type`,
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/isolated-object-avatar-dummy-sign-set-avatar-image-vector-icon-stock-vector-design-avatar-dummy-logo-137161322.jpg",
      validate(value) {
        if (!validator.isURL(value)) throw new Error("Invalid URL");
      },
    },
    about: {
      type: String,
      default: "This is default about",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Compound Index for query where search is for both firstName, lastName or we can add multiple fields here as well
userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const user = this; // We are usign this therefore don't use arrow fun as it will refer to something else then
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder14", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const isPswdValid = await bcrypt.compare(passwordInputByUser, this.password); // this.password is hash password
  return isPswdValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

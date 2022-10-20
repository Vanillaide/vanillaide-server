const { Schema, model } = require("mongoose");
const REGEX = require("../constants/validateCondition");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    match: [REGEX.NAME, "You can only use English and Korean name"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [REGEX.EMAIL, "Invali email form"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: [
      REGEX.PASSWORD,
      "You can only use between 8-20 digits of numbers and alphabets",
    ],
  },
});

const User = model("User", userSchema);

module.exports = User;

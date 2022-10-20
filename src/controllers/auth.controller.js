const createError = require("http-errors");
const ERROR = require("../constants/error");
const REGEX = require("../constants/validateCondition");
const User = require("../models/User");

exports.postSignUp = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !passwordConfirm ||
      !REGEX.NAME.test(username) ||
      !REGEX.EMAIL.test(email) ||
      !REGEX.PASSWORD.test(password) ||
      !REGEX.PASSWORD.test(passwordConfirm) ||
      passwordConfirm !== password
    ) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const registeredUser = await User.findOne({ email });

    if (registeredUser) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    await User.create({ username, email, password });

    res.status(200).json({ result: "Success" });
  } catch (err) {
    next(err);
  }
};

exports.postLogIn = () => {};

exports.postLogOut = () => {};

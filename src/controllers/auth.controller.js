const createError = require("http-errors");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const ERROR = require("../constants/error");
const jwt = require("jsonwebtoken");

exports.postAuthCheck = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!payload) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const { email } = payload;

    const user = await User.findOne({ email }, "username email").lean();

    if (!user) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    res.status(200).json({ result: "Success", user });
  } catch (err) {
    next(err);
  }
};

exports.postSignUp = () => {};

exports.postLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.headers;

    const user = await User.findOne(
      { email },
      "username email password",
    ).lean();

    if (!user) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const token = await jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );

    res.setHeader("token", token);
    res.status(200).json({ result: "Success", user });
  } catch (err) {
    next(err);
  }
};

exports.postLogOut = () => {};

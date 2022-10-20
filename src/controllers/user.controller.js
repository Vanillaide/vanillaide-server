const mongoose = require("mongoose");
const createError = require("http-errors");

const User = require("../models/User");
const Project = require("../models/Project");
const ERROR = require("../constants/error");

exports.getProjects = () => {};

exports.postProject = async (req, res, next) => {
  const { userId } = req.params;
  const { projectName } = req.body;

  if (!userId || !projectName || projectName.length > 50) {
    return next(createError(400, ERROR.BAD_REQUEST));
  }

  if (!mongoose.isValidObjectId(userId)) {
    return next(createError(400, ERROR.BAD_REQUEST));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(createError(400, ERROR.BAD_REQUEST));
  }

  await Project.create({
    creator: userId,
    name: projectName,
  });

  res.status(201).json({ result: "Success" });
};

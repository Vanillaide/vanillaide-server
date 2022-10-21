const mongoose = require("mongoose");
const createError = require("http-errors");

const Project = require("../models/Project");
const ERROR = require("../constants/error");

exports.patchProject = () => {};

exports.deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!projectId || !mongoose.isValidObjectId(projectId)) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ result: "Success" });
  } catch (err) {
    next(err);
  }
};

exports.postDeployment = () => {};

exports.getDeployment = () => {};

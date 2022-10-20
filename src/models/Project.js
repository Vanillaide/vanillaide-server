const { Schema, model } = require("mongoose");

const ERROR = require("../constants/error");

const deployStateSchema = new Schema({
  deployedAt: { type: Date },
});

const projectSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    maxLength: [50, ERROR.MORE_THAN_MAXLENGTH],
    required: true,
  },
  htmlFile: {
    type: String,
    default: "",
  },
  cssFile: {
    type: String,
    default: "",
  },
  jsFile: {
    type: String,
    default: "",
  },
  deployLink: {
    type: String,
    default: "",
  },
  deployState: {
    type: deployStateSchema,
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;

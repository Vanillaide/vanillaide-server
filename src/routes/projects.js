const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");
const {
  patchProject,
  deleteProject,
  getDeployment,
  postDeployment,
} = require("../controllers/project.controller");

router
  .route("/:projectId")
  .all(authenticate)
  .patch(patchProject)
  .delete(deleteProject);

router
  .route("/:projectId/deployment")
  .all(authenticate)
  .get(getDeployment)
  .post(postDeployment);

module.exports = router;

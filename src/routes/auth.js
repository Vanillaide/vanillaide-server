const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");

const {
  postSignUp,
  postLogIn,
  postLogOut,
} = require("../controllers/auth.controller");

router.post("/signup", postSignUp);

router.post("/login", postLogIn);

router.post("/logout", authenticate, postLogOut);

module.exports = router;

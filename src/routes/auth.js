const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");

const { login, logout } = require("../controllers/auth.controller");

router.post("/login", login);

router.post("/logout", authenticate, logout);

module.exports = router;

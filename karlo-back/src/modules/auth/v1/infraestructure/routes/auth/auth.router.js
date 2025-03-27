const express = require("express");
const AuthController = require("../../../interfaces/controllers/AuthController");
const router = express.Router();
const controller = new AuthController();

router.post("/login", controller.login);

module.exports = router;

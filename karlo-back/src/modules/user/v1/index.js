const express = require("express");
const router = express.Router();

const userRoutes = require("./infraestructure/routes/user-router");

router.use(userRoutes);

module.exports = router;

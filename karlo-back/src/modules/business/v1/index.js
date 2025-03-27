const express = require("express");
const router = express.Router();

const businessRoutes = require("./infraestructure/routes/business-router");

router.use(businessRoutes);

module.exports = router;

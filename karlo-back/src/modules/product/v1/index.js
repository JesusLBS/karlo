const express = require("express");
const router = express.Router();

const productRoutes = require("./infraestructure/routes/product-router");

router.use(productRoutes);

module.exports = router;

const express = require("express");
const router = express.Router();

const purchaseorderRoutes = require("./infraestructure/routes/purchaseorder-router");

router.use(purchaseorderRoutes);

module.exports = router;

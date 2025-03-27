const express = require("express");
const PurcharseOrderController = require("../../interfaces/controllers/purchaseorder-controller");
const {
    PurcharseOrderRequest,
    PurchaseOrderValidation,
} = require("../../../../../request/PurcharseOrderRequest");

const {
    IdentifierParamRequest,
    IdentifierParamValidation,
} = require("../../../../../request/IdentifierParamRequest");

const router = express.Router();
const controller = new PurcharseOrderController();

router
    .get("/:limit/:page/:sort/:direction/:withTrashed/:search", controller.index)
    .post("/", PurcharseOrderRequest, PurchaseOrderValidation, controller.store)
    .put("/", PurcharseOrderRequest, PurchaseOrderValidation, controller.update)
    .delete(
        "/:dataId",
        IdentifierParamRequest,
        IdentifierParamValidation,
        controller.destroy,
    );

module.exports = router;

const express = require("express");
const BusinessController = require("../../interfaces/controllers/business-controller");
const {
    BusinessRequest,
    BusinessValidation,
} = require("../../../../../request/BusinessRequest");

const {
    IdentifierParamRequest,
    IdentifierParamValidation,
} = require("../../../../../request/IdentifierParamRequest");
const {
    IdentifierBodyRequest,
    IdentifierBodyValidation,
} = require("../../../../../request/IdentifierBodyRequest");

const router = express.Router();
const controller = new BusinessController();

router
    .get("/:limit/:page/:sort/:direction/:withTrashed/:search", controller.index)
    .post("/", BusinessRequest, BusinessValidation, controller.store)
    .put("/", BusinessRequest, BusinessValidation, controller.update)
    .post(
        "/deactivate",
        IdentifierBodyRequest,
        IdentifierBodyValidation,
        controller.deactivate,
    )
    .delete(
        "/:dataId",
        IdentifierParamRequest,
        IdentifierParamValidation,
        controller.destroy,
    );

module.exports = router;

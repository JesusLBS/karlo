const express = require("express");
const ProductController = require("../../interfaces/controllers/product-controller");
const {
    ProductRequest,
    ProductValidation,
} = require("../../../../../request/ProductRequest");

const {
    IdentifierParamRequest,
    IdentifierParamValidation,
} = require("../../../../../request/IdentifierParamRequest");
const {
    IdentifierBodyRequest,
    IdentifierBodyValidation,
} = require("../../../../../request/IdentifierBodyRequest");

const router = express.Router();
const controller = new ProductController();

router
    .get("/:limit/:page/:sort/:direction/:withTrashed/:search", controller.index)
    .post("/", ProductRequest, ProductValidation, controller.store)
    .put("/", ProductRequest, ProductValidation, controller.update)
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

const { check } = require("express-validator");
const ValidateHelper = require("../helpers/validation/ validateHelper");
const errorValueParameter = "The parameter is required";
const valid = new ValidateHelper();

exports.PurcharseOrderRequest = [
  check("status", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check("total", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check("subtotal", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check("products", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
];

exports.PurchaseOrderValidation = (req, res, next) => {
  valid.validationResult(req, res, next);
};

const { check } = require("express-validator");
const ValidateHelper = require("../helpers/validation/ validateHelper");
const errorValueParameter = "The parameter is required";
const valid = new ValidateHelper();

exports.ProductRequest = [
  check("name", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check("amount", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check("price", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check("businessId", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check("inStock", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
];

exports.ProductValidation = (req, res, next) => {
  valid.validationResult(req, res, next);
};

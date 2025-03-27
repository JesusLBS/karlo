const { check } = require("express-validator");
const ValidateHelper = require("../helpers/validation/ validateHelper");
const errorValueParameter = "The parameter is required";
const valid = new ValidateHelper();

exports.IdentifierBodyRequest = [
  check("dataId", errorValueParameter).custom(
    (value) => valid.isValid(value) && true,
  ),
];

exports.IdentifierBodyValidation = (req, res, next) => {
  valid.validationResult(req, res, next);
};

const { check } = require("express-validator");
const ValidateHelper = require("../helpers/validation/ validateHelper");
const errorValueParameter = "The parameter is required";
const valid = new ValidateHelper();

exports.BusinessRequest = [
  check("name", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
];

exports.BusinessValidation = (req, res, next) => {
  valid.validationResult(req, res, next);
};

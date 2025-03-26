const { check } = require("express-validator");
const ValidateHelper = require("../helpers/validation/ validateHelper");
const errorValueParameter = "The parameter is required";
const valid = new ValidateHelper();

exports.UserRequest = [
  check("name", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check("email", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check("password", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
  check("rol", errorValueParameter)
    .exists()
    .custom((value) => valid.isValid(value)),
];

exports.UserValidation = (req, res, next) => {
  valid.validationResult(req, res, next);
};

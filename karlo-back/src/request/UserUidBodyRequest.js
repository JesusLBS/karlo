const { check } = require("express-validator");
const ValidateHelper = require("../helpers/validation/ validateHelper");
const errorValueParameter = "The parameter is required";
const valid = new ValidateHelper();

exports.UserUidBodyRequest = [
  check("dataId", errorValueParameter).custom(
    (value) => valid.isValid(value) && true,
  ),
];

exports.UserUidBodyValidation = (req, res, next) => {
  valid.validationResult(req, res, next);
};

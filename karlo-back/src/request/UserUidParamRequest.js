const { param } = require("express-validator");
const ValidateHelper = require("../helpers/validation/ validateHelper");
const errorValueParameter = "The parameter is required";
const valid = new ValidateHelper();

exports.UserUidParamRequest = [
  param("dataId", errorValueParameter)
    .exists()
    .withMessage("Id is required")
    .not()
    .isIn(["null", "undefined", "", "''", ":dataId"])
    .withMessage("Id is not valid")
    .isAlphanumeric()
    .withMessage("Id must be alphanumeric")
    .custom((value) => valid.isValid(value)),
];

exports.UserUidParamValidation = (req, res, next) => {
  valid.validationResult(req, res, next);
};

const { validationResult } = require("express-validator");
const ResponseHelper = require("../response/responseHelper");
const response = new ResponseHelper();

class ValidateHelper {
  validationResult = (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (errors) {
      return response.error(res, errors.array(), 400);
    }
  };

  isValid = (data) => {
    const listErrors = [
      "",
      "",
      "''",
      "``",
      null,
      "null",
      undefined,
      "undefined",
    ];
    listErrors.find((value) => {
      if (value === data) throw new Error("The value is required");
    });
    return true;
  };
}

module.exports = ValidateHelper;

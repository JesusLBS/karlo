const config = require("../../config/config");
const ResponseHelper = require("../../helpers/response/responseHelper");
const response = new ResponseHelper();

const apiKeyMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.get("x-api-key");
    if (apiKey != config.apiKey) {
      throw { statusCode: 401, message: "Api key is missing or invalid" };
    }
    return next();
  } catch (error) {
    return response.error(res, error);
  }
};

module.exports = {
  apiKeyMiddleware,
};

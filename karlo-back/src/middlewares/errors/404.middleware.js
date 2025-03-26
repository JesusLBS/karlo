const config = require("../../config/config");
const ResponseHelper = require("../../helpers/response/responseHelper");
const response = new ResponseHelper();

const notFound = (req, res) => {
  let error = "";
  config.nodeEnv != "production"
    ? (error = `${req.originalUrl} - page not found`)
    : (error = "page not found");

  return response.error(res, error, 404);
};

module.exports = {
  notFound,
};

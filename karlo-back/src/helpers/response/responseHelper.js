const config = require("../../config/config");

class ResponseHelper {
  static instanceCount = 0;
  static instance;

  constructor(defaultErrorMessage = "An unexpected error has occurred") {
    if (ResponseHelper.instance) {
      return ResponseHelper.instance;
    }
    ResponseHelper.instanceCount++;
    this.defaultErrorMessage = defaultErrorMessage;
    ResponseHelper.instance = this;
  }

  success({ res, status = 200, data = {} }) {
    const response = {
      ok: true,
      status,
      message: "Success request",
      data: { ...data },
    };
    return res.status(status).json(response);
  }

  error(res, error, status = 500) {
    console.log("=====================");
    console.log("======  Error  ======");
    console.log("===================== \n");
    console.error(error);

    if (error.statusCode) {
      status = error.statusCode;
      error = error.message;
    }

    const response = {
      ok: false,
      status,
      message: this.defaultErrorMessage,
    };

    if (config.nodeEnv !== "production") {
      response.errors = error;
    }

    return res.status(status).json(response);
  }

  destroy(res) {
    return res.status(204).send();
  }
}
module.exports = ResponseHelper;

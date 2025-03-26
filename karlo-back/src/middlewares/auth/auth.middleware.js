const config = require("../../config/config");
const ResponseHelper = require("../../helpers/response/responseHelper");
const JwtHelper = require("../../helpers/security/jwtHelper");
const UserRepositoryImpl = require("../../modules/user/v1/infraestructure/data/user-repository-impl");
const response = new ResponseHelper();

const getToken = (req) => {
  const token = req.get("authorization");
  if (!token) {
    throw { statusCode: 401, message: "Non-existent token" };
  }
  return token.split("Bearer ")[1];
};

const validateToken = async (req, res, next, validateFn) => {
  try {
    const bearerToken = getToken(req);
    const { apiKey, jwtKey, cryptokey } = config;

    const data = await new JwtHelper(bearerToken, jwtKey, cryptokey)[
      validateFn
    ](apiKey);

    const user = await new UserRepositoryImpl().findUserByUid(data.user.uid);
    if (!user) {
      throw { statusCode: 401, message: "Invalid token" };
    }
    const { uid, role } = user;

    req.auth = { uid, role };

    next();
  } catch (error) {
    return response.error(res, error);
  }
};

const validJWTMiddleware = async (req, res, next) =>
  await validateToken(req, res, next, "validateJWT");

const refreshJWTMiddleware = async (req, res, next) =>
  await validateToken(req, res, next, "validateRefreshJWT");

module.exports = {
  validJWTMiddleware,
  refreshJWTMiddleware,
};

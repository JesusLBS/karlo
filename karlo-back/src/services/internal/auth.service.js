const config = require("../../config/config");
const bcrypt = require('bcrypt');
const JwtHelper = require("../../helpers/security/jwtHelper");

class AuthService {
  token = async (user) => {
    const jwtKey = config.jwtKey;
    const cryptokey = config.cryptokey;
    const apiKey = config.apiKey;
    const payload = { user, apiKey };

    const jwtHelper = new JwtHelper(payload, jwtKey, cryptokey);

    const token = await jwtHelper.generateJWT();

    return token;
  };

  hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  };

  comparePassword = async (plainPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  };

};

const instance = new AuthService();
Object.freeze(instance);

module.exports = instance;
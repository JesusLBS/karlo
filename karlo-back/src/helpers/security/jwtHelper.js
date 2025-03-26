const jwt = require("jsonwebtoken");
const CipherHelper = require("./cipherHelper");

class JwtHelper {
  constructor(payload, jwtKey, cryptokey) {
    this.payload = payload;
    this.jwtKey = jwtKey;
    this.cryptokey = cryptokey;
  }

  async generateJWT() {
    const cipherHelper = new CipherHelper(this.payload, this.cryptokey);
    const encryptedData = cipherHelper.cipherData();
    const token = await this.signJWT(
      { data: encryptedData },
      this.jwtKey,
      "1h",
    );
    return token;
  }

  async validateJWT(apiKey) {
    const data = await this.verifyJWT(this.payload, this.jwtKey);
    const cipherHelper = new CipherHelper(data.data, this.cryptokey);
    const decryptedData = cipherHelper.decipherData();
    if (decryptedData.apiKey !== apiKey) {
      throw new Error("Invalid API key");
    }
    delete decryptedData.apiKey;
    return decryptedData;
  }

  async validateRefreshJWT(apiKey) {
    const {
      payload: { data: dataDecode },
    } = jwt.decode(this.payload, { complete: true });
    const cipherHelper = new CipherHelper(dataDecode, this.cryptokey);
    const decryptedData = cipherHelper.decipherData();
    if (decryptedData.apiKey !== apiKey) {
      throw new Error("Invalid API key");
    }
    delete decryptedData.apiKey;
    return decryptedData;
  }

  signJWT(payload, secret, expiresIn) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, { expiresIn }, (error, token) => {
        if (error) {
          console.error(error);
          return reject({
            statusCode: 400,
            message: "An unexpected error has occurred",
          });
        }
        resolve(token);
      });
    });
  }

  verifyJWT(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, data) => {
        if (error) {
          console.error(error);
          return reject({ statusCode: 401, message: "Invalid token" });
        }
        resolve(data);
      });
    });
  }
}

module.exports = JwtHelper;

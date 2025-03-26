const crypto = require("crypto-js");

class CipherHelper {
  constructor(payload, cryptokey) {
    this.payload = payload;
    this.cryptokey = cryptokey;
  }

  cipherData() {
    return crypto.AES.encrypt(
      JSON.stringify(this.payload),
      this.cryptokey,
    ).toString();
  }

  decipherData() {
    const bytes = crypto.AES.decrypt(this.payload, this.cryptokey);
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
  }
}

module.exports = CipherHelper;

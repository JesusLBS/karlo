module.exports = {
  port: process.env.NODE_PORT || 4500,
  nodeEnv: process.env.NODE_ENV || "local",
  database: {
    dbDialect: process.env.DB_DIALECT || "mysql",
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_DATABASE,
    dbHost: process.env.DB_HOST,
  },
  apiKey: process.env.API_KEY,
  cryptokey: process.env.CRYPTO_KEY,
  jwtKey: process.env.JWT_KEY,
};

const http = require("http");
const config = require("../config/config");
const app = require("..");
const dbConnect = require("../database/conection/dbConnect");

const port = config.port || 4500;
const env = config.nodeEnv;
const now = new Date().toLocaleString("es-MX", { hour12: false });

let logMessages = [];

const logMessage = (message) => logMessages.push(message);

const printLogMessages = () => {
  console.clear();
  logMessages.forEach((message) => console.log(message));
};

const startServer = () => {
  const server = http.createServer(app);
  server.listen(port, (error) => {
    if (error) {
      console.error("❌  Error al iniciar el servidor:");
      console.error(error);
      process.exit(1);
    }
    logMessage(`* ✅ "${env.toUpperCase()}" environment started successfully`);
    if (env !== "production") {
      logMessage(
        `* ✅ Server is now listening at: http://localhost:${port}  \n`,
      );
    } else {
      logMessage(`* ✅ Server is now listening at port: ${port}  \n`);
    }
    printLogMessages();
  });
};

const initializeApp = async () => {
  try {
    await dbConnect();
    logMessage(`* ✅ ${now} \n`);
    logMessage("* ✅ Connection to the database successful.");
    logMessage(`* ✅ Successful connection to: ${config.database.dbDialect}`);
    startServer();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = { initializeApp };

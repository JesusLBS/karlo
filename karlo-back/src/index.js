const { notFound } = require("./middlewares/errors/404.middleware");
const { apiKeyMiddleware } = require("./middlewares/auth/apikey.middleware");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// define a root route
app.get("/", (req, res) => res.send("Hello World"));

app.use("/", apiKeyMiddleware);

//const routerModule = require("./modules/routes/routes");
//routerModule(app);

app.use("*", notFound);

module.exports = app;

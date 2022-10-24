const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const initLoaders = require("./loaders/index");

const indexRouter = require("./routes/index");

const invalidUrlHandler = require("./middlewares/invalidUrlHandler");
const errorHandler = require("./middlewares/errorHandler");

const scheduleJob = require("./schedule");

const app = express();

initLoaders(app);

scheduleJob();

app.use("/api", indexRouter);

app.use(invalidUrlHandler);
app.use(errorHandler);

module.exports = app;

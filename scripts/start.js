/* eslint-disable import/unambiguous */

const yargs = require("yargs");
const express = require("express");

const server = require("../dist/server/app");

const argv = yargs.argv;
const PORT = Number(argv.port);

const options = {
  clientStats: require("../dist/client/stats.json"),
  serverStats: require("../dist/server/stats.json"),
};

const app = express();

app.use("/assets", express.static("./dist/client/assets"));
app.use(server(options));

app.listen(PORT);

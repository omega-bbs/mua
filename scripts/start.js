/* eslint-disable import/unambiguous */

const minimist = require("minimist");
const express = require("express");

const server = require("../dist/server/app");

const argv = minimist(process.argv.slice(2));
const PORT = Number(argv["port"]);

const options = {
  clientStats: require("../dist/client/stats.json"),
  serverStats: require("../dist/server/stats.json"),
};

const app = express();

app.use("/assets", express.static("./dist/client/assets"));
app.use(server(options));

app.listen(PORT);

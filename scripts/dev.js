/* eslint-disable import/unambiguous */

const yargs = require("yargs");
const open = require("opn");
const express = require("express");
const proxy = require("http-proxy-middleware");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const multi = require("../webpack/multi.config");

const argv = yargs.argv;
const PORT = Number(argv.port);
const API_PORT = Number(argv.apiPort);

const find = (list, name) => list.find(item => item.name === name);

const app = express();

const config = multi({ stats: false });
find(config, "client").entry.app = [
  "webpack-hot-middleware/client",
  ...find(config, "client").entry.app,
];
find(config, "client").plugins.push(new webpack.NoEmitOnErrorsPlugin());
find(config, "client").plugins.push(new webpack.HotModuleReplacementPlugin());
find(config, "client").plugins.push(new FriendlyErrorsPlugin());

const compiler = webpack(config);

app.use(
  proxy("/api", {
    target: `http://127.0.0.1:${API_PORT}`,
    pathRewrite: { "^/api": "" },
  }),
);

app.use(
  webpackDevMiddleware(compiler, { quiet: true, serverSideRender: true }),
);
app.use(webpackHotMiddleware(find(compiler.compilers, "client")));
app.use(webpackHotServerMiddleware(compiler, { chunkName: "app" }));

app.listen(PORT);

open(`http://127.0.0.1:${PORT}/`);

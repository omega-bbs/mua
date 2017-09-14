/* eslint-disable import/unambiguous */

const yargs = require("yargs");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const multi = require("../webpack/multi.config");

const argv = yargs.argv;
const PORT = Number(argv.port);

const find = (list, name) => list.find(item => item.name === name);

const app = express();

const config = multi({ stats: false });
find(config, "client").entry.app = [
  "webpack-hot-middleware/client",
  ...find(config, "client").entry.app,
];
find(config, "client").plugins.push(new webpack.HotModuleReplacementPlugin());
find(config, "client").plugins.push(new FriendlyErrorsPlugin());

const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, { quiet: true, serverSideRender: true }),
);
app.use(webpackHotMiddleware(find(compiler.compilers, "client")));
app.use(webpackHotServerMiddleware(compiler, { chunkName: "app" }));

app.listen(PORT);

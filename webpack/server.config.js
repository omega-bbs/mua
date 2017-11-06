/* eslint-disable import/unambiguous */

const path = require("path");
const nodeExternals = require("webpack-node-externals");

const rules = require("./common/rules");
const plugins = require("./common/plugins");

module.exports = options => {
  return {
    context: path.resolve("."),

    entry: {
      app: ["@babel/polyfill", "./entry/server"],
    },

    output: {
      path: path.resolve("./dist/server"),
      filename: "[name].js",
      libraryTarget: "commonjs2",
      libraryExport: "default",
    },

    target: "node",

    devtool: "source-map",

    externals: [
      nodeExternals({
        whitelist: [/\.(?!(js|json)$)[^.]+$/],
      }),
    ],

    module: {
      rules: rules("server", options),
    },

    plugins: plugins("server", options),
  };
};

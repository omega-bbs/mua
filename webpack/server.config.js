/* eslint-disable import/unambiguous */

const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");

const rules = require("./common/rules");

module.exports = ({ stats = true } = {}) => {
  const production = process.env.NODE_ENV === "production";

  return {
    context: path.resolve("."),

    entry: {
      app: ["babel-polyfill", "./entry/server"],
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
      rules: rules("server"),
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: production,
      }),

      new webpack.EnvironmentPlugin({
        NODE_ENV: production ? "production" : "development",
      }),

      new CaseSensitivePathsPlugin(),

      production
        ? new webpack.HashedModuleIdsPlugin()
        : new webpack.NamedModulesPlugin(),

      production && new webpack.optimize.ModuleConcatenationPlugin(),

      production && new BabelMinifyPlugin(),

      stats && new StatsPlugin("stats.json"),
    ].filter(Boolean),
  };
};

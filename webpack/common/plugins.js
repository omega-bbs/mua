/* eslint-disable import/unambiguous */

const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");

const production = process.env.NODE_ENV === "production";

module.exports = (side, { stats = true } = {}) =>
  [
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
  ].filter(Boolean);

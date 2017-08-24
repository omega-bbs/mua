/* eslint-disable import/unambiguous */

const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

module.exports = ({ friendly = false } = {}) => {
  const production = process.env.NODE_ENV === "production";

  return {
    context: path.resolve("."),

    entry: {
      app: ["babel-polyfill", "./entry/server"],
    },

    output: {
      path: path.resolve("./dist/server"),
      filename: "[name].js",
    },

    target: "node",

    devtool: "source-map",

    externals: [nodeExternals()],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: production,
      }),

      new webpack.EnvironmentPlugin({
        NODE_ENV: production ? "production" : "development",
      }),

      new CaseSensitivePathsPlugin(),

      !production && new webpack.NamedModulesPlugin(),

      production && new webpack.optimize.ModuleConcatenationPlugin(),

      production &&
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
        }),

      friendly && new FriendlyErrorsPlugin(),
    ].filter(Boolean),
  };
};

/* eslint-disable import/unambiguous */

const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
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

        {
          test: /\.svg$/,
          loader: "svg-react-loader",
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

      production && new BabelMinifyPlugin(),

      friendly && new FriendlyErrorsPlugin(),
    ].filter(Boolean),
  };
};

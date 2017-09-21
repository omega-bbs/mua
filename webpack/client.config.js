/* eslint-disable import/unambiguous */

const path = require("path");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");

const rules = require("./common/rules");

module.exports = ({ stats = true } = {}) => {
  const production = process.env.NODE_ENV === "production";

  return {
    context: path.resolve("."),

    entry: {
      app: [
        "babel-polyfill",
        "dom4",
        "pepjs",
        "react-hot-loader/patch",
        "./entry/client",
      ],
    },

    output: {
      path: path.resolve("./dist/client"),
      publicPath: "/",
      filename: production
        ? "assets/[name]-[chunkhash].js"
        : "assets/[name].js",
    },

    devtool: "source-map",

    resolve: {
      alias: {
        react: path.resolve("./node_modules/react"),
        "react-dom": path.resolve("./node_modules/react-dom"),
        "prop-types": path.resolve("./node_modules/prop-types"),
      },
    },

    module: {
      rules: rules("client"),
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

/* eslint-disable import/unambiguous */

const path = require("path");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const rules = require("./common/rules");

module.exports = ({ friendly = false } = {}) => {
  const production = process.env.NODE_ENV === "production";
  const stats = process.env.STATS === "true";

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

      !production && new webpack.NamedModulesPlugin(),

      production && new webpack.optimize.ModuleConcatenationPlugin(),

      production && new BabelMinifyPlugin(),

      new ManifestPlugin({
        fileName: "manifest.json",
        publicPath: "/",
        writeToFileEmit: true,
      }),

      stats &&
        new BundleAnalyzerPlugin({
          analyzerMode: "disabled",
          generateStatsFile: true,
        }),

      friendly && new FriendlyErrorsPlugin(),
    ].filter(Boolean),
  };
};

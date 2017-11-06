/* eslint-disable import/unambiguous */

const path = require("path");
const webpack = require("webpack");

const rules = require("./common/rules");
const plugins = require("./common/plugins");

module.exports = options => {
  const production = process.env.NODE_ENV === "production";

  return {
    context: path.resolve("."),

    entry: {
      app: [
        "@babel/polyfill",
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
      rules: rules("client", options),
    },

    plugins: [
      production &&
        new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          minChunks: module =>
            module.context &&
            module.context.includes("node_modules") &&
            module.resource &&
            module.resource.endsWith(".js"),
        }),

      ...plugins("client", options),
    ].filter(Boolean),
  };
};

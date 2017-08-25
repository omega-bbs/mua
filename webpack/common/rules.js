/* eslint-disable import/unambiguous */

const production = process.env.NODE_ENV === "production";

module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  },

  {
    test: /\.svg$/,
    use: [
      { loader: "svg-react-loader" },
      production && { loader: "svgo-loader" },
    ].filter(Boolean),
  },
];

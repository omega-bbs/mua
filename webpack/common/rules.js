/* eslint-disable import/unambiguous */

module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  },

  {
    test: /\.svg$/,
    loader: "svg-react-loader",
  },
];

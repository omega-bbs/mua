/* eslint-disable import/unambiguous */

const production = process.env.NODE_ENV === "production";

module.exports = side => [
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

  {
    test: /\.css$/,
    use:
      side === "client"
        ? [{ loader: "style-loader" }, { loader: "css-loader" }]
        : [{ loader: "css-loader/locals" }],
  },
];

const production = process.env.NODE_ENV === "production";
const test = process.env.NODE_ENV === "test";

module.exports = {
  presets: [
    ["@babel/preset-env", { modules: false }],
    "@babel/preset-stage-0",
    "@babel/preset-react",
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", { polyfill: false, useBuiltIns: true }],

    // plugins for libraries
    ["babel-plugin-styled-components", { ssr: true, displayName: !production }],
    production && "babel-plugin-graphql-tag",

    // hot reload
    // "react-hot-loader/babel",

    // optimize for react
    !production && "@babel/plugin-transform-react-jsx-source",
    production && [
      "babel-plugin-transform-react-remove-prop-types",
      { ignoreFilenames: ["node_modules"] },
    ],

    // transform modules for test
    test && "@babel/plugin-transform-modules-commonjs",
  ].filter(Boolean),
};

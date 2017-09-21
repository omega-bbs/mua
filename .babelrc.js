const production = process.env.NODE_ENV === "production";
const test = process.env.NODE_ENV === "test";

module.exports = {
  presets: [["env", { modules: false }], "stage-0", "react"],
  plugins: [
    ["transform-runtime", { polyfill: false, useBuiltIns: true }],
    "lodash",
    ["styled-components", { ssr: true, displayName: !production }],
    production && "graphql-tag",
    "react-hot-loader/babel",
    !production && "transform-react-jsx-source",
    production && [
      "transform-react-remove-prop-types",
      { ignoreFilenames: ["node_modules"] },
    ],
    test && "transform-es2015-modules-commonjs",
  ].filter(Boolean),
};

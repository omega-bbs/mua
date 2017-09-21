const production = process.env.NODE_ENV === "production";
const test = process.env.NODE_ENV === "test";

module.exports = {
  presets: [["env", { modules: false }], "stage-0", "react"],
  plugins: [
    test && "transform-es2015-modules-commonjs",
    ["transform-runtime", { polyfill: false, useBuiltIns: true }],
    ["styled-components", { ssr: true, displayName: !production }],
    "react-hot-loader/babel",
  ].filter(Boolean),
};

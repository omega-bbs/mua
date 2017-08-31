const production = process.env.NODE_ENV === "production";

module.exports = {
  presets: [["env", { modules: false }], "stage-0", "react"],
  plugins: [
    ["transform-runtime", { polyfill: false, useBuiltIns: true }],
    ["styled-components", { ssr: true, displayName: !production }],
    "react-hot-loader/babel",
  ],
  env: {
    test: {
      plugins: ["transform-es2015-modules-commonjs"],
    },
  },
};

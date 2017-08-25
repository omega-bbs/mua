const production = process.env.NODE_ENV === "production";

module.exports = {
  presets: [["env", { spec: true, modules: false }], "stage-0", "react"],
  plugins: [
    "transform-runtime",
    ["styled-components", { ssr: true, displayName: !production }],
    "react-hot-loader/babel",
  ],
  env: {
    test: {
      plugins: ["transform-es2015-modules-commonjs"],
    },
  },
};

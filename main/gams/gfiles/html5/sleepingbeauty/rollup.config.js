"use strict";

const includePaths = require("rollup-plugin-includepaths");

const includePathsOptions = {
  paths: ["src/js"]
};

module.exports = {
  input: "src/js/app.js",
  output: {
    file: "src/app.rollup.js",
    format: "iife"
  },
  plugins: [includePaths(includePathsOptions)]
};

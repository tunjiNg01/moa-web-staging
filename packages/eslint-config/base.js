/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "prettier"],
  env: {
    node: true,
    es2022: true,
  },
  ignorePatterns: ["node_modules/", "dist/", ".turbo/"],
};

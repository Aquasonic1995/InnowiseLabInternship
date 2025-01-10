import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"], // Apply to all .js files
    languageOptions: {
      sourceType: "commonjs", // Use CommonJS module system
      globals: globals.browser, // Add browser globals
    },
    plugins: {
      prettier: prettierPlugin, // Add Prettier plugin
    },
    rules: {
      ...prettierConfig.rules, // Include Prettier rules to disable ESLint conflicts
      "prettier/prettier": "error", // Enable Prettier as a rule
    },
  },
  pluginJs.configs.recommended, // Use recommended rules from @eslint/js
];
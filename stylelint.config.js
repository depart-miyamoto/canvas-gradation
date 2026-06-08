/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-tailwindcss",
    "stylelint-config-recess-order",
  ],
  plugins: ["stylelint-scss"],
  ignoreFiles: ["dist/**/*", "node_modules/**/*"],
  rules: {
    // at-ruleを完全に無効化
    "at-rule-no-unknown": null,
    // SCSS固有ルール - Sass at-ruleを明示的に許可
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "layer",
          "apply",
          "config",
          "theme",
          "use",
          "forward",
          "import",
          "include",
          "mixin",
          "function",
        ],
      },
    ],
    "scss/selector-no-redundant-nesting-selector": true,
    "at-rule-no-deprecated": null, // @applyを許可
    "font-family-name-quotes": "always-unless-keyword",
    "keyframes-name-pattern": null, // キーフレーム名のパターンを無効化
    "alpha-value-notation": "number", // アルファ値を数値で許可
    // BEM命名規則を許可するセレクタパターン
    "selector-class-pattern": [
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$",
      {
        message:
          "Expected class selector to be kebab-case or BEM pattern (block__element--modifier)",
      },
    ],
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: [/^rem/, /^res-/], // 文字列ではなくRegExpオブジェクトで指定
      },
    ],
  },
};

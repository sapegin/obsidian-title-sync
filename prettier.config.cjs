/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.md',
      options: {
        arrowParens: 'avoid',
        printWidth: 70,
        proseWrap: 'never',
        trailingComma: 'none',
      },
    },
  ],
};

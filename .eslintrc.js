module.exports = {
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-undef': 'off',
    "@typescript-eslint/indent": ["error", 4, { "SwitchCase": 1}],
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 0,
    "@typescript-eslint/naming-convention": ["error", { "selector": "variableLike", "format": ["camelCase", "UPPER_CASE"] }],
    "@typescript-eslint/comma-dangle": ["error"],
    "@typescript-eslint/comma-spacing": ["error"],
    "@typescript-eslint/member-delimiter-style": ["error"],
    "@typescript-eslint/no-extra-semi": ["error"],
    "@typescript-eslint/no-for-in-array": ["error"],
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-useless-constructor": ["error"],
    "@typescript-eslint/space-before-blocks": ["error"],
    "@typescript-eslint/require-await": ["error"],
    "padded-blocks": ["error", { "blocks": "always", "classes": "always", "switches": "always" }],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 1}],
    "no-multi-spaces": ["error", { ignoreEOLComments: false }],
    "no-useless-catch": "error",
    "semi": ["error"],
    "object-curly-spacing": ["error", "always"]
  }
};
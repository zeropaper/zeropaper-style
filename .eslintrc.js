module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'graphql',
  ],
  rules: {
  },
};

module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    // 'eslint:recommended',
    // 'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
    // 'prettier',
    // 'prettier/@typescript-eslint',
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
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/extensions': ['error', 'always', {
      ts: 'never',
      tsx: 'never',
      js: 'never',
      jsx: 'never',
    }],
    'no-use-before-define': 'off',
    // '@typescript-eslint/no-use-before-define': ['error'],
  },
};

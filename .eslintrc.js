module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', 'lodash'],
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:lodash/recommended',
  ],
  rules: {
    // Next.js doesn't require react to be in scope
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'lodash/prefer-lodash-method': 'off',
    'lodash/prefer-constant': 'off',
  },
};

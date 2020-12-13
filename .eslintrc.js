module.exports = {
  root: true,
  extends: ['@scaleway/react', 'plugin:mdx/recommended'],
  plugins: ['@emotion'],
  // parser: "babel-eslint",
  rules: {
    'no-nested-ternary': 'warn',
    'no-param-reassign': 'warn',
    'no-shadow': 'warn',
    'react/jsx-filename-extension': 'off',
    // Import
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.*',
          '**/*.test.js',
          '**/*.spec.js',
          '**/__tests__/*',
          'rollup.config.js',
        ],
      },
    ],
    'import/prefer-default-export': 'off',

    // React
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'warn',
    'react/require-default-props': 'warn',

    // emotion
    '@emotion/styled-import': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/syntax-preference': ['error', 'string'],
  },
}

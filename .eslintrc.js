module.exports = {
  root: true,
  extends: ['@scaleway/react', 'plugin:mdx/recommended'],
  plugins: ['@emotion'],
  rules: {
    'no-nested-ternary': 'warn',
    'no-param-reassign': 'warn',
    'no-shadow': 'warn',

    // Sort
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
        allowSeparatedGroups: false,
      },
    ],
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
    'react/jsx-filename-extension': 'off',
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

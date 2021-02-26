module.exports = {
  root: true,
  extends: ['@scaleway/react', 'plugin:mdx/recommended'],
  plugins: ['@emotion'],
  rules: {
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

    'import/prefer-default-export': 'warn',

    // React
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.mdx'] }],
    'react/destructuring-assignment': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'react/no-array-index-key': 'warn',

    // emotion
    '@emotion/styled-import': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/syntax-preference': ['error', 'string'],
  },
  overrides: [
    {
      files: ['**/__stories__/*', '**/__tests__/*'],
      rules: {
        'no-console': 'off',
        'no-alert': 'off',
      },
    },
  ],
}

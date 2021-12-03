const generateColorsRules = () => ({
  noRestrictedSyntax: [
    {
      message: `Deprecated color usage, use colors instead.`,
      selector:
        'MemberExpression[object.object.name="theme"] Identifier[name="colorsDeprecated"], MemberExpression[object.name="colorsDeprecated"] Identifier[name="colorsDeprecated"]',
    },
  ],
})

const colorRules = generateColorsRules()

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['@scaleway/react', 'plugin:mdx/recommended'],
  overrides: [
    {
      extends: ['@scaleway/react/typescript'],
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
      rules: {
        'no-restricted-syntax': ['warn', ...colorRules.noRestrictedSyntax],
        'react/jsx-props-no-spreading': 'warn',
        'react/require-default-props': 'off',
      },
    },
    {
      files: ['**/__stories__/*', '**/__tests__/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      files: ['**/__stories__/**/*.mdx'],
      parser: 'eslint-mdx',
      rules: {
        'padding-line-between-statements': 'off',
        'react/no-unescaped-entities': 'off',
      },
    },
  ],
  parser: '@babel/eslint-parser',
  plugins: ['@emotion'],
  root: true,
  rules: {
    // Import
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.*',
          '**/__stories__/**/*',
          '**/*.test.js',
          '**/*.spec.js',
          '**/__tests__/*',
          'rollup.config.mjs',
        ],
      },
    ],

    // React
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.mdx'] }],
    'react/jsx-props-no-spreading': 'warn',
    'react/sort-prop-types': 'off',

    // emotion
    // eslint-disable-next-line sort-keys
    '@emotion/import-from-emotion': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/styled-import': 'error',
    '@emotion/syntax-preference': ['error', 'string'],

    // This is temporary while we mix js/ts code. Can be removed once the migration is complete
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    // This is temporary while we mix js/ts code. Can be removed once the migration is complete
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
}

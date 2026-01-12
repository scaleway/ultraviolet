import { join } from 'node:path'

export default [
  {
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        { packageDir: [__dirname, join(__dirname, '../')] },
      ],
    },
  },
]

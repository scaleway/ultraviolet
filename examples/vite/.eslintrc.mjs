import { join } from 'node:path'

export default [
  {
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        { packageDir: [__dirname, join(__dirname, '../')] },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  },
]

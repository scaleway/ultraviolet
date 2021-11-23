import type { Config } from '@jest/types'
import * as path from 'path'

const config: Config.InitialOptions = {
  rootDir: path.join(__dirname, '..'),
  testEnvironment: 'jsdom',
  coverageReporters: ['text', 'cobertura'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '.reports',
        outputName: 'tests.xml',
      },
    ],
  ],
  transformIgnorePatterns: ['node_modules/(?!@scaleway)'],
  testPathIgnorePatterns: ['/nodes_modules/', 'src/components'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.jest/fileMock.ts',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: ['**/a11y.test.tsx'],
}

export default config

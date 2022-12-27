import type { Config } from '@jest/types'
import path from 'path'

const config: Config.InitialOptions = {
  rootDir: path.join(__dirname, '..'),
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx,ts,tsx}',
    '!**/src/**/__stories__/**/*.{js,ts,tsx,mdx}',
    '!website/**',
    '!**/dist/**',
  ],
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
  transformIgnorePatterns: ['node_modules/(?!(.*(@scaleway)))'],
  modulePathIgnorePatterns: ['packages/ui/src/__tests__/a11y.test.tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.jest/fileMock.ts',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/.jest/setupTests.ts'],
}

export default config

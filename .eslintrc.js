module.exports = {
  root: true,
  extends: ['smooth', 'smooth/react', 'smooth/project'],
  plugins: ['emotion'],
  rules: {
    // Emotion
    'emotion/styled-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/import-from-emotion': 'error',
    'emotion/syntax-preference': ['error', 'string'],
  },
  env: {
    browser: true,
  },
}

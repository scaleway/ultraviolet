import { afterAll, jest, beforeAll } from '@jest/globals'
import '@testing-library/jest-dom/jest-globals'

// Mock console.warn to NOT display them and avoid pollution in the console
global.console.warn = () => {
  return
}

// TODO: Fix all console.errors on test to enable this
/*let consoleHasError = false
const { error } = console

// Mock console.error to clearly display errors on tests
global.console.error = (...args) => {
  consoleHasError = true
  error(...args)
}

beforeEach(() => {
  if (consoleHasError) {
    consoleHasError = false
  }
})

afterEach(() => {
  if (consoleHasError) {
    throw new Error(
      'Your test contains some console errors. Please scroll up and search for any red text showing an error and fix it.',
    )
  }
})*/

// Mock random to avoid differences on snapshots when updating tests
beforeAll(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
})

afterAll(() => {
  jest.spyOn(global.Math, 'random').mockRestore()
})

import '@testing-library/jest-dom'

// Mock random to avoid differences on snapshots when updating tests
beforeAll(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
})

afterAll(() => {
  jest.spyOn(global.Math, 'random').mockRestore()
})

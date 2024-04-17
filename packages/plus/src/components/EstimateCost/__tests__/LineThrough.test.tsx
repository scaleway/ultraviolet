import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  jest,
  test,
} from '@jest/globals'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import { LineThrough } from '../Components/LineThrough'

describe('EstimateCost - LineThrough', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  beforeEach(() => {
    setupIntersectionMocking(jest.fn)
  })

  afterEach(() => {
    resetIntersectionMocking()
  })

  test('render with basic values', () =>
    shouldMatchEmotionSnapshot(
      <LineThrough isActive>This is a beta</LineThrough>,
    ))
})

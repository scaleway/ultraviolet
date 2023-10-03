import { afterAll, beforeAll, describe, jest, test } from '@jest/globals'
import { shouldMatchEmotionSnapshot } from 'helpers/tests/jestHelpers'
import { LineThrough } from '../LineThrough'

describe('EstimateCost - LineThrough', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  test('render with basic values', () =>
    shouldMatchEmotionSnapshot(
      <LineThrough isActive>This is a beta</LineThrough>,
    ))
})

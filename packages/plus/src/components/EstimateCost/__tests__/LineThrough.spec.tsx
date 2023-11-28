import { afterAll, beforeAll, describe, jest, test } from '@jest/globals'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import { LineThrough } from '../Components/LineThrough'

describe('EstimateCost - LineThrough', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
    mockAllIsIntersecting(true)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  test('render with basic values', () =>
    shouldMatchEmotionSnapshot(
      <LineThrough isActive>This is a beta</LineThrough>,
    ))
})

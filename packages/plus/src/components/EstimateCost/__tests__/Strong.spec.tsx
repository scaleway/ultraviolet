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
import { EstimateCost } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('EstimateCost - Strong Item', () => {
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

  test('render basic props', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Strong">
          <EstimateCost.Strong>This is a strong Item</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with small variant', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Strong">
          <EstimateCost.Strong variant="small">
            This is a strong Item
          </EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with isDisabledOnOverlay', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Strong">
          <EstimateCost.Strong isDisabledOnOverlay>
            This is a strong Item
          </EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))
})

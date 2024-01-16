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

describe('EstimateCost - Item', () => {
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

  test('render with noPrice and noBorder', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" noPrice noBorder>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with tabulation', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" tabulation={2}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with labelTextVariant', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" labelTextVariant="bodySmall">
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with priceText', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" priceText="included">
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with tooltipInfo', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" tooltipInfo="This is a tooltip">
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with notice', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" notice="This is a notice">
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))
})

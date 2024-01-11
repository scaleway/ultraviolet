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

describe('EstimateCost - NumberInput Item', () => {
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
        <EstimateCost.Item label="NumberInput">
          <EstimateCost.NumberInput />
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic with overlay', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="NumberInput">
          <EstimateCost.NumberInput />
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with values', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          label="Chocolates"
          subLabel="Chocolate is never free :("
          price={1}
          unit="chocolate"
          amount={50}
          longFractionDigits
        >
          <EstimateCost.NumberInput minValue={0} maxValue={51} />
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with getAmountValue', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="NumberInput">
          <EstimateCost.NumberInput getAmountValue={value => value} />
        </EstimateCost.Item>
      </EstimateCost>,
    ))
})

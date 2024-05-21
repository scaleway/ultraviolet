import { shouldMatchEmotionSnapshot } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, test, vi } from 'vitest'
import { EstimateCost } from '..'

describe('EstimateCost - NumberInput Item', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
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

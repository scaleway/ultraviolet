import { shouldMatchEmotionSnapshot } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, test, vi } from 'vitest'
import { EstimateCost } from '..'

describe('estimateCost - Strong Item', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
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

import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { EstimateCost } from '..'

describe('estimateCost - Item', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })
  afterEach(() => {
    resetIntersectionMocking()
  })
  it('render with noPrice and noBorder', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost>
        <EstimateCost.Item label="Test" noBorder noPrice>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('render with tabulation', () => {
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" tabulation={2}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
  })

  it('render with labelTextVariant', () => {
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" labelTextVariant="bodySmall">
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
  })

  it('render with priceText', () => {
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" priceText="included">
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
  })

  it('render with tooltipInfo', () => {
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" tooltipInfo="This is a tooltip">
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
  })

  it('render with notice', () => {
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" notice="This is a notice">
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
  })
})

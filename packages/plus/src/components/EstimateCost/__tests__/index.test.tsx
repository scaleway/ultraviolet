import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { EstimateCost } from '..'

describe('EstimateCost - index', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })
  afterEach(() => {
    resetIntersectionMocking()
  })
  test('render isBeta without discount', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost isBeta>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render isBeta with discount', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost isBeta discount={0.5}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render isBeta with discount more than 100%', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost isBeta discount={2}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render isBeta with discount equal to 100%', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost isBeta discount={1}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with discount 100% but no isBeta', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost discount={1}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with isBeta but undefined discount', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost isBeta discount={undefined}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with isBeta, price, discount 50%', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost isBeta discount={0.5}>
        <EstimateCost.Item label="Test" price={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with item discount 50%', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Test" discount={0.5} monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with item discount 50% and text', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          label="Test"
          discount={0.5}
          discountText="Nice discount"
          monthlyPrice={99}
        >
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with item discount 50% and defaultTimeUnit months', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost defaultTimeUnit="months">
        <EstimateCost.Item label="Test" discount={0.5} monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with all timeUnits values', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost
        timeUnits={['seconds', 'minutes', 'hours', 'days', 'months']}
      >
        <EstimateCost.Item label="Test">
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with discount 1, isBeta and defaultTimeUnit months', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost isBeta discount={1} defaultTimeUnit="months">
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with discount 1 and defaultTimeUnit months', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost discount={1} defaultTimeUnit="months">
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with discount 0 and defaultTimeUnit months', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost discount={0} defaultTimeUnit="months">
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with isBeta, discount 0 and defaultTimeUnit months', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost isBeta discount={0} defaultTimeUnit="months">
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render with isBeta, discount 0.5 and defaultTimeUnit months', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost isBeta discount={0.5} defaultTimeUnit="months">
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render with discount 0.5 and defaultTimeUnit months', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost discount={0.5} defaultTimeUnit="months">
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render with hideTimeUnit', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost hideTimeUnit>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render with hideTotal', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost hideTotal>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render with commitmentFees', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost hideTotal commitmentFees={10}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render with commitmentFees and iscommitmentFeesCreditCard', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost hideTotal commitmentFees={10}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('render with description as node', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost description={<p>This is a more complex children</p>}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

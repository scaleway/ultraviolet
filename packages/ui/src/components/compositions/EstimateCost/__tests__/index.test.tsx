import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { EstimateCost } from '..'

describe('estimateCost - index', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })
  afterEach(() => {
    resetIntersectionMocking()
  })
  test('render isBeta without discount', () =>
    shouldMatchSnapshot(
      <EstimateCost isBeta>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render isBeta with discount', () =>
    shouldMatchSnapshot(
      <EstimateCost discount={0.5} isBeta>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render isBeta with discount more than 100%', () =>
    shouldMatchSnapshot(
      <EstimateCost discount={2} isBeta>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render isBeta with discount equal to 100%', () =>
    shouldMatchSnapshot(
      <EstimateCost discount={1} isBeta>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with discount 100% but no isBeta', () =>
    shouldMatchSnapshot(
      <EstimateCost discount={1}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with isBeta but undefined discount', () =>
    shouldMatchSnapshot(
      <EstimateCost discount={undefined} isBeta>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with isBeta, price, discount 50%', () =>
    shouldMatchSnapshot(
      <EstimateCost discount={0.5} isBeta>
        <EstimateCost.Item label="Test" price={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with item discount 50%', () =>
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item discount={0.5} label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with item discount 50% and text', () =>
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          discount={0.5}
          discountText="Nice discount"
          label="Test"
          monthlyPrice={99}
        >
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with item discount 50% and defaultTimeUnit months', () =>
    shouldMatchSnapshot(
      <EstimateCost defaultTimeUnit="months">
        <EstimateCost.Item discount={0.5} label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with all timeUnits values', () =>
    shouldMatchSnapshot(
      <EstimateCost
        timeUnits={['seconds', 'minutes', 'hours', 'days', 'months']}
      >
        <EstimateCost.Item label="Test">
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with discount 1, isBeta and defaultTimeUnit months', () =>
    shouldMatchSnapshot(
      <EstimateCost defaultTimeUnit="months" discount={1} isBeta>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with discount 1 and defaultTimeUnit months', () =>
    shouldMatchSnapshot(
      <EstimateCost defaultTimeUnit="months" discount={1}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with discount 0 and defaultTimeUnit months', () =>
    shouldMatchSnapshot(
      <EstimateCost defaultTimeUnit="months" discount={0}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with isBeta, discount 0 and defaultTimeUnit months', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost defaultTimeUnit="months" discount={0} isBeta>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render with isBeta, discount 0.5 and defaultTimeUnit months', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost defaultTimeUnit="months" discount={0.5} isBeta>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render with discount 0.5 and defaultTimeUnit months', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost defaultTimeUnit="months" discount={0.5}>
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
      <EstimateCost commitmentFees={10} hideTotal>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render with commitmentFees and iscommitmentFeesCreditCard', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost commitmentFees={10} hideTotal>
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

  test('render compact', () =>
    shouldMatchSnapshot(
      <EstimateCost compact defaultTimeUnit="months" discount={0}>
        <EstimateCost.Item label="Test" monthlyPrice={99}>
          <EstimateCost.Strong>Test</EstimateCost.Strong>
        </EstimateCost.Item>
      </EstimateCost>,
    ))
})

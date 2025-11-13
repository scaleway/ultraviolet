import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { EstimateCost } from '..'

describe('estimateCost - Unit Item', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })
  afterEach(() => {
    resetIntersectionMocking()
  })

  test('render basic props', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost>
        <EstimateCost.Item label="Unit">
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('render basic props with monthly price', () => {
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Unit" monthlyPrice={100}>
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
    )
  })

  test('render basic props with values', () =>
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          amount={100}
          amountFree={50}
          label="Storage"
          price={0.001}
          subLabel="50 GB Free"
          unit="GB"
        >
          <EstimateCost.Unit unit="GB" />
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic props with values and no iteration', () =>
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          amount={100}
          amountFree={50}
          label="Storage"
          maxAmount={100}
          noIteration
          price={0.001}
          subLabel="50 GB Free"
          unit="GB"
        >
          <EstimateCost.Unit unit="GB" />
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render test', () =>
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          amount={100}
          amountFree={75}
          hideFromOverlay
          label="value"
          price={0.001}
          subLabel="value"
          unit="value"
        >
          <EstimateCost.Unit unit="value" />
        </EstimateCost.Item>
        <EstimateCost.Item
          amount={100}
          amountFree={75}
          hideFromOverlay
          label="value"
          maxAmount={150}
          noIteration
          price={0.0003}
          subLabel="value"
          unit="value"
        >
          <EstimateCost.Unit unit="value" />
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render basic props with overlay', () =>
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Unit" monthlyPrice={100}>
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with 0 amount', () =>
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item amount={0} label="Unit" price={10}>
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test('render with 10 amount', () =>
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item amount={10} label="Unit" price={10}>
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
    ))

  test(`render with value update`, async () => {
    renderWithTheme(
      <EstimateCost>
        <EstimateCost.Item label="Unit">
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
    )

    const input = screen.getAllByRole('spinbutton')[1] as HTMLInputElement
    await waitFor(() => expect(input.value).toBe('1'))
    await userEvent.click(input)
    await userEvent.type(input, '0')
    await waitFor(() => expect(input.value).toBe('10'))
  })

  test(`render with negative value update`, async () => {
    renderWithTheme(
      <EstimateCost>
        <EstimateCost.Item label="Unit">
          <EstimateCost.Unit />
        </EstimateCost.Item>
      </EstimateCost>,
    )

    const input = screen.getAllByRole('spinbutton')[1] as HTMLInputElement
    await waitFor(() => expect(input.value).toBe('1'))
    await userEvent.click(input)
    await userEvent.type(input, '{Control>}A{Delete}-1')
    await waitFor(() => expect(input.value).toBe('0'))
  })

  test('render with getAmountValue', () =>
    shouldMatchSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="Unit" monthlyPrice={100}>
          <EstimateCost.Unit getAmountValue={value => value} />
        </EstimateCost.Item>
      </EstimateCost>,
    ))
})

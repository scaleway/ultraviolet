import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { OrderSummary } from '..'
import {
  categoryAZ,
  categoryCustomContent,
  categoryDefault,
  categoryM2,
  categoryOptions,
  categoryRequest,
  categoryStorage,
  fixePrice,
  negativeItem,
} from './resources'

const mockItems = [
  categoryAZ,
  categoryCustomContent,
  categoryDefault,
  categoryM2,
  categoryOptions,
  negativeItem,
  fixePrice,
  categoryRequest,
  categoryStorage,
]

describe('OrderSummary', () => {
  it('should work with default props', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        header="summary"
        items={mockItems}
        currency="EUR"
        localeFormat="en-EN"
      />,
    ))

  it('should work without unitInput', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        header="summary"
        items={mockItems}
        currency="EUR"
        localeFormat="en-EN"
        hideTimeUnit
      />,
    ))

  it('should work with custom timeUnit', async () => {
    renderWithTheme(
      <OrderSummary
        header="summary"
        items={[categoryAZ]}
        currency="EUR"
        localeFormat="en-EN"
        periodOptions={['minutes', 'hours', 'days', 'months']}
        valueUnitInput={2}
        unitUnitInput="days"
      />,
    )
    const unitInput = screen.getByTestId('unit-input')
    expect(screen.getByTestId('total-price').textContent).toBe('€240.00')

    await userEvent.type(unitInput, '[Backspace]1')
    expect(screen.getByTestId('total-price').textContent).toBe('€120.00')

    const unitInputUnit = screen.getByTestId('select-input--unit')
    await userEvent.click(unitInputUnit)

    const hours = screen.getByTestId('option-hours')
    await userEvent.click(hours)
    expect(screen.getByTestId('total-price').textContent).toBe('€5.00')
  })

  it('should work with children', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        header="summary"
        items={mockItems}
        currency="EUR"
        localeFormat="en-EN"
      >
        children
      </OrderSummary>,
    ))

  it('should work with footer', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        header="summary"
        items={mockItems}
        currency="EUR"
        localeFormat="en-EN"
        footer="footer"
      />,
    ))

  it('should work with totalPriceInfo', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        header="summary"
        items={mockItems}
        currency="EUR"
        localeFormat="en-EN"
        totalPriceInfo="total price info"
      />,
    ))

  it('should work with discount', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        header="summary"
        items={[categoryAZ]}
        currency="EUR"
        localeFormat="en-EN"
        discount={0.5}
      />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€2.50')

    expect(asFragment()).toMatchSnapshot()
  })
})

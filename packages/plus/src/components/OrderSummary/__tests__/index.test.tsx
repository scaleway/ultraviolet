import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
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
  numberInputCategory,
  numberInputSubCategory,
  rangePriceContent,
  simpleCategory,
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
  test('should work with default props', () =>
    shouldMatchEmotionSnapshot(<OrderSummary items={mockItems} />))

  test('should work with an empty list of item', () =>
    shouldMatchEmotionSnapshot(<OrderSummary items={[]} />))

  test('should work without unitInput', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        header="summary"
        items={mockItems}
        currency="EUR"
        localeFormat="en-EN"
        hideTimeUnit
      />,
    ))

  test('should work with custom timeUnit', async () => {
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
    expect(screen.getByTestId('total-price').textContent).toBe('€120.00')

    await userEvent.type(unitInput, '[Backspace]1')
    expect(screen.getByTestId('total-price').textContent).toBe('€60.00')

    const unitInputUnit = screen.getByTestId('select-input--unit')
    await userEvent.click(unitInputUnit)

    const hours = screen.getByTestId('option-hours')
    await userEvent.click(hours)
    expect(screen.getByTestId('total-price').textContent).toBe('€2.50')
  })

  test('should work with children', () =>
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

  test('should work with footer', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        header="summary"
        items={mockItems}
        currency="EUR"
        localeFormat="en-EN"
        footer="footer"
      />,
    ))

  test('should work with price as a range', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        header="summary"
        items={[rangePriceContent]}
        currency="EUR"
        localeFormat="en-EN"
        footer="footer"
      />,
    ))

  test('should work with totalPriceInfo', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        header="summary"
        items={mockItems}
        currency="EUR"
        localeFormat="en-EN"
        totalPriceInfo="total price info"
      />,
    ))

  test('should work with numberInputs', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        header="summary"
        items={[numberInputCategory, numberInputSubCategory]}
        currency="EUR"
        localeFormat="en-EN"
        totalPriceInfo="total price info"
      />,
    ))

  test('should work with discount in  %', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        header="summary"
        items={[simpleCategory]}
        currency="EUR"
        localeFormat="en-EN"
        discount={0.5}
      />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€2.50')

    expect(asFragment()).toMatchSnapshot()
  })

  test('should work with discount', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        header="summary"
        items={[simpleCategory]}
        currency="EUR"
        localeFormat="en-EN"
        discount={10}
      />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€0.00')

    expect(asFragment()).toMatchSnapshot()
  })

  test('should work with fractionDigits', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        header="summary"
        items={[simpleCategory]}
        currency="EUR"
        localeFormat="en-EN"
        discount={0.5}
        fractionDigits={0}
      />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€3')

    expect(asFragment()).toMatchSnapshot()
  })
})

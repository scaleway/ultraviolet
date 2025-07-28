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
        currency="EUR"
        header="summary"
        hideTimeUnit
        items={mockItems}
        localeFormat="en-EN"
      />,
    ))

  test('should work with custom timeUnit', async () => {
    renderWithTheme(
      <OrderSummary
        currency="EUR"
        header="summary"
        items={[categoryAZ]}
        localeFormat="en-EN"
        periodOptions={['minutes', 'hours', 'days', 'months']}
        unitUnitInput="days"
        valueUnitInput={2}
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
        currency="EUR"
        header="summary"
        items={mockItems}
        localeFormat="en-EN"
      >
        children
      </OrderSummary>,
    ))

  test('should work with footer', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        currency="EUR"
        footer="footer"
        header="summary"
        items={mockItems}
        localeFormat="en-EN"
      />,
    ))

  test('should work with price as a range', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        currency="EUR"
        footer="footer"
        header="summary"
        items={[rangePriceContent]}
        localeFormat="en-EN"
      />,
    ))

  test('should work with totalPriceInfo', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        currency="EUR"
        header="summary"
        items={mockItems}
        localeFormat="en-EN"
        totalPriceInfo="total price info"
      />,
    ))

  test('should work with additionalInfo', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        additionalInfo="additional info"
        currency="EUR"
        header="summary"
        items={mockItems}
        localeFormat="en-EN"
      >
        children
      </OrderSummary>,
    ))
  test('should work with numberInputs', () =>
    shouldMatchEmotionSnapshot(
      <OrderSummary
        currency="EUR"
        header="summary"
        items={[numberInputCategory, numberInputSubCategory]}
        localeFormat="en-EN"
        totalPriceInfo="total price info"
      />,
    ))

  test('should work with discount in  %', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        currency="EUR"
        discount={0.5}
        header="summary"
        items={[simpleCategory]}
        localeFormat="en-EN"
      />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€2.50')

    expect(asFragment()).toMatchSnapshot()
  })

  test('should work with discount', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        currency="EUR"
        discount={10}
        header="summary"
        items={[simpleCategory]}
        localeFormat="en-EN"
      />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€0.00')

    expect(asFragment()).toMatchSnapshot()
  })

  test('should work with fractionDigits', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        currency="EUR"
        discount={0.5}
        fractionDigits={0}
        header="summary"
        items={[simpleCategory]}
        localeFormat="en-EN"
      />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€3')

    expect(asFragment()).toMatchSnapshot()
  })

  test('works with hideDetails', () =>
    shouldMatchEmotionSnapshot(
      <>
        <OrderSummary header="summary" hideDetails items={[categoryAZ]} />
        <OrderSummary
          discount={0.5}
          header="summary"
          hideDetails
          items={[categoryAZ]}
        />
      </>,
    ))

  test('works with negative category price', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary header="summary" items={[categoryAZ, negativeItem]} />,
    )
    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€0.00')

    expect(asFragment()).toMatchSnapshot()
  })
})

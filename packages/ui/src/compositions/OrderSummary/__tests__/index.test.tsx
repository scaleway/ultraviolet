import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { OrderSummary } from '..'
import {
  anchorProduct,
  categoryAZ,
  categoryCustomContent,
  categoryDefault,
  categoryM2,
  categoryOptions,
  categoryRequest,
  categoryStorage,
  falsyCategory,
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

describe('orderSummary', () => {
  it('should work with default props', () => {
    const { asFragment } = renderWithTheme(<OrderSummary items={mockItems} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with an empty list of item', () => {
    const { asFragment } = renderWithTheme(<OrderSummary items={[]} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work without unitInput', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary currency="EUR" header="summary" hideTimeUnit items={mockItems} localeFormat="en-EN" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with custom timeUnit', async () => {
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

  it('should work with children', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary currency="EUR" header="summary" items={mockItems} localeFormat="en-EN">
        children
      </OrderSummary>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with footer', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary currency="EUR" footer="footer" header="summary" items={mockItems} localeFormat="en-EN" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with price information', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        currency="EUR"
        footer="footer"
        header="summary"
        items={mockItems}
        localeFormat="en-EN"
        priceInformation="Information"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with price information boolean', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        currency="EUR"
        footer="footer"
        header="summary"
        items={mockItems}
        localeFormat="en-EN"
        priceInformation
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with price as a range', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary currency="EUR" footer="footer" header="summary" items={[rangePriceContent]} localeFormat="en-EN" />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with totalPriceInfo', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        currency="EUR"
        header="summary"
        items={mockItems}
        localeFormat="en-EN"
        totalPriceInfo="total price info"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with totalPriceInfo and totalPriceInfoPlacement', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        currency="EUR"
        header="summary"
        items={mockItems}
        localeFormat="en-EN"
        totalPriceInfo="total price info"
        totalPriceInfoPlacement="right"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with additionalInfo', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        additionalInfo="additional info"
        currency="EUR"
        header="summary"
        items={mockItems}
        localeFormat="en-EN"
      >
        children
      </OrderSummary>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('should work with numberInputs', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        currency="EUR"
        header="summary"
        items={[numberInputCategory, numberInputSubCategory]}
        localeFormat="en-EN"
        totalPriceInfo="total price info"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with discount in  %', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary currency="EUR" discount={0.5} header="summary" items={[simpleCategory]} localeFormat="en-EN" />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€2.50')

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with discount of 100%', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary currency="EUR" discount={1} header="summary" items={[simpleCategory]} localeFormat="en-EN" />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€0.00')

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with hide before price', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        className="test-className"
        currency="EUR"
        discount={0.5}
        header="summary"
        hideBeforePrice
        items={[simpleCategory]}
        localeFormat="en-EN"
      />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€2.50')

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with discount', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary currency="EUR" discount={10} header="summary" items={[simpleCategory]} localeFormat="en-EN" />,
    )

    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€0.00')

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with fractionDigits', () => {
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

  it('works with hideDetails', () => {
    const { asFragment } = renderWithTheme(
      <>
        <OrderSummary header="summary" hideDetails items={[categoryAZ]} />
        <OrderSummary discount={0.5} header="summary" hideDetails items={[categoryAZ]} />
      </>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('works compact', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary header="summary" items={[categoryAZ]} compact backgroundProminence="strong" calculatorIcon />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('works with calculator icon', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary header="summary" items={[categoryAZ]} compact backgroundProminence="default" calculatorIcon />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('works compact with total price info', () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        header="summary"
        items={[categoryAZ]}
        compact
        backgroundProminence="default"
        calculatorIcon
        totalPriceInfo="Info"
        totalPriceInfoPlacement="left"
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('works with negative category price', () => {
    const { asFragment } = renderWithTheme(<OrderSummary header="summary" items={[categoryAZ, negativeItem]} />)
    const price = screen.getByTestId('total-price').textContent
    expect(price).toBe('€0.00')

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with anchors', async () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        currency="EUR"
        discount={0.5}
        fractionDigits={0}
        header="summary"
        items={[anchorProduct]}
        localeFormat="en-EN"
      />,
    )

    const anchor1Link = screen.getByText('This is an anchor')
    const anchor2Link = screen.getByText('This is also an anchor')

    await userEvent.click(anchor1Link)
    await userEvent.click(anchor2Link)

    expect(asFragment()).toMatchSnapshot()
  })

  it('display titles that are defined and falsy', async () => {
    const { asFragment } = renderWithTheme(
      <OrderSummary
        currency="EUR"
        discount={0.5}
        fractionDigits={0}
        header="summary"
        items={[falsyCategory]}
        localeFormat="en-EN"
      />,
    )

    expect(screen.getByText('0')).toBeVisible()
    expect(screen.getAllByText('€10')).toHaveLength(3) // price appears in category, sub-category and total price

    expect(asFragment()).toMatchSnapshot()
  })
})

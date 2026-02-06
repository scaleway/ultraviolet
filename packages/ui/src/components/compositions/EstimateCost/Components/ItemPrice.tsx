import { Text } from '../../../Text'
import { useEstimateCost } from '../EstimateCostProvider'
import { calculatePrice } from '../helper'
import type { ItemPriceProps, Units } from '../types'

const TIME_RELATED_UNIT: Units[] = [
  'seconds',
  'minutes',
  'hours',
  'days',
  'months',
]

export const ItemPrice = ({
  computedItemPrice,
  computedMaxItemPrice,
  strikeThrough,
  noIterationText,
  priceText,
  formatMaximumFractionDigits,
  amount,
  amountFree,
  maxAmount,
  noIteration,
  discount,
  price,
  longFractionDigits,
  maximumFractionDigitsLong,
  maximumFractionDigits,
  unit,
}: ItemPriceProps) => {
  const { locales, formatNumber } = useEstimateCost()

  return (
    <>
      <Text
        as="p"
        placement="right"
        prominence={
          computedItemPrice === 0 && computedMaxItemPrice === 0
            ? 'weak'
            : 'default'
        }
        sentiment={
          computedItemPrice === 0 && computedMaxItemPrice === 0
            ? 'neutral'
            : 'primary'
        }
        strikeThrough={strikeThrough}
        variant={noIterationText ? 'headingSmall' : 'bodyStrong'}
      >
        {priceText}
        {priceText
          ? null
          : formatNumber(computedItemPrice, {
              maximumFractionDigits: formatMaximumFractionDigits,
            })}
        {noIterationText ? (
          <Text as="span" sentiment="primary" variant="bodySmall">
            /{noIterationText}
          </Text>
        ) : null}
        {!priceText && computedMaxItemPrice > 0
          ? ` - ${formatNumber(computedMaxItemPrice, {
              maximumFractionDigits: formatMaximumFractionDigits,
            })}`
          : null}
      </Text>
      {(amount - amountFree !== 1 && computedItemPrice > 0) ||
      (maxAmount > 0 && computedMaxItemPrice > 0) ? (
        <Text as="p" placement="right" variant="body">
          {formatNumber(
            calculatePrice({
              amount: 1,
              discount,
              price,
              timeAmount: 1,
              timeUnit: 'hours',
            }),
            {
              maximumFractionDigits: longFractionDigits
                ? maximumFractionDigitsLong.hours
                : maximumFractionDigits.hours,
            },
          )}
          {TIME_RELATED_UNIT.includes(unit as Units)
            ? locales[
                `estimate.cost.units.${unit as Units}.label`
              ].toLowerCase()
            : `/${unit}`}
          {noIteration
            ? null
            : `/${locales['estimate.cost.units.hours.label'].toLowerCase()}`}
        </Text>
      ) : null}
    </>
  )
}

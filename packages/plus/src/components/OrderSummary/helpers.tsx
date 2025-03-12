import { useContext } from 'react'
import { OrderSummaryContext } from './Provider'
import { multiplier } from './constants'
import type { ItemsType, SubCategoryType, TimeUnit } from './types'

export const formatNumber = (
  number: number,
  locale: string,
  currency: string,
  fractionDigits = 10,
) => {
  const numberFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: fractionDigits,
  })

  return numberFormat.format(number)
}

// time unit = hours, days, months
// timeAmount = number of hours / days / months
// discount < 1: computed in % (price = price*discount)
// discount >= 1: computed in absolute value (price = price - discount)
export const calculatePrice = (
  price: number,
  amount: number,
  amountFree = 0,
  timeUnit: TimeUnit,
  timeAmount: number,
  discount = 0,
  fixedPrice = false,
) => {
  const nonNanTimeAmount = Number.isNaN(timeAmount) ? 1 : timeAmount
  const valueBeforeDiscount =
    price *
    (fixedPrice ? 1 : nonNanTimeAmount * multiplier[`${timeUnit}`]) *
    Math.max(amount - amountFree, 0)

  const finalValue =
    valueBeforeDiscount * (1 - (discount < 1 ? discount : 0)) -
    (discount >= 1 ? Math.abs(discount) : 0)

  return Math.max(finalValue, 0)
}

export const calculateSubCategoryPrice = (
  subCategory: SubCategoryType,
  hideTimeUnit: boolean,
  timePeriodAmount: number,
  timePeriodUnit: TimeUnit,
): [number, number] => {
  if (Array.isArray(subCategory.amount)) {
    const minPrice =
      calculatePrice(
        subCategory.price ?? 0,
        subCategory.amount?.[0] ?? 1,
        subCategory.amountFree,
        hideTimeUnit ? 'hours' : timePeriodUnit,
        hideTimeUnit ? 1 : timePeriodAmount,
        subCategory.discount,
        subCategory.fixedPrice,
      ) || 0
    const maxPrice =
      calculatePrice(
        subCategory.price ?? 0,
        subCategory.amount?.[1] ?? 1,
        subCategory.amountFree,
        hideTimeUnit ? 'hours' : timePeriodUnit,
        hideTimeUnit ? 1 : timePeriodAmount,
        subCategory.discount,
        subCategory.fixedPrice,
      ) || 0

    return [minPrice, maxPrice]
  }

  const price =
    calculatePrice(
      subCategory.price ?? 0,
      subCategory.amount ?? 1,
      subCategory.amountFree,
      hideTimeUnit ? 'hours' : timePeriodUnit,
      hideTimeUnit ? 1 : timePeriodAmount,
      subCategory.discount,
      subCategory.fixedPrice,
    ) || 0

  return [price, price]
}

export const calculateCategoryPrice = (
  category: ItemsType,
  hideTimeUnit: boolean,
  timePeriodAmount: number,
  timePeriodUnit: TimeUnit,
): { categoryPrice: [number, number]; discountedPrice: [number, number] } => {
  const categoryPrice: [number, number] = category.subCategories?.reduce(
    (acc, subCategory) => {
      const computedPrices = calculateSubCategoryPrice(
        subCategory,
        hideTimeUnit,
        timePeriodAmount,
        timePeriodUnit,
      )

      return [acc[0] + computedPrices[0], acc[1] + computedPrices[1]]
    },
    [0, 0],
  ) || [0, 0]

  const discountedPrice: [number, number] = [
    Math.max(
      category.discount && category.discount < 1
        ? categoryPrice[0] * category.discount
        : categoryPrice[0] - (category.discount ?? 0),
      0,
    ),
    Math.max(
      category.discount && category.discount < 1
        ? categoryPrice[1] * category.discount
        : categoryPrice[1] - (category.discount ?? 0),
      0,
    ),
  ]
  categoryPrice.map(price =>
    Math.max(
      category.discount && category.discount < 1
        ? price * category.discount
        : price - (category.discount ?? 0),
      0,
    ),
  )

  return { categoryPrice, discountedPrice }
}

type DisplayPriceProps = {
  price: { before: [number, number]; after: [number, number] }
  beforeOrAfter: 'before' | 'after'
}

export const DisplayPrice = ({ price, beforeOrAfter }: DisplayPriceProps) => {
  const { localeFormat, currency, fractionDigits } =
    useContext(OrderSummaryContext)

  return price[beforeOrAfter][0] === price[beforeOrAfter][1]
    ? formatNumber(
        price[beforeOrAfter][0],
        localeFormat,
        currency,
        fractionDigits ?? 2,
      )
    : `${formatNumber(
        price[beforeOrAfter][0],
        localeFormat,
        currency,
        fractionDigits ?? 2,
      )} - ${formatNumber(
        price[beforeOrAfter][1],
        localeFormat,
        currency,
        fractionDigits ?? 2,
      )}`
}

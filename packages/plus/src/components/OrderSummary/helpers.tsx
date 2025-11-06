import { useContext } from 'react'
import { multiplier } from './constants'
import { OrderSummaryContext } from './Provider'
import type {
  CurrencyType,
  ItemsType,
  LocalesFormatType,
  PriceTypeSingle,
  SubCategoryType,
  TimeUnit,
} from './types'

export const formatNumber = (
  number: number,
  locale: LocalesFormatType,
  currency: CurrencyType,
  fractionDigits = 10,
) => {
  const numberFormat = new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits: fractionDigits,
    style: 'currency',
  })

  return numberFormat.format(number)
}

type CalculatePriceProps = {
  price: number
  amount: number
  amountFree?: number
  timeUnit: TimeUnit
  timeAmount: number
  discount?: number
  fixedPrice?: boolean
}

// time unit = hours, days, months
// timeAmount = number of hours / days / months
// discount < 1: computed in % (price = price*discount)
// discount >= 1: computed in absolute value (price = price - discount)
export const calculatePrice = ({
  price,
  amount,
  amountFree = 0,
  timeUnit,
  timeAmount,
  discount = 0,
  fixedPrice = false,
}: CalculatePriceProps) => {
  const nonNanTimeAmount = Number.isNaN(timeAmount) ? 1 : timeAmount
  const valueBeforeDiscount =
    price *
    (fixedPrice ? 1 : nonNanTimeAmount * multiplier[`${timeUnit}`]) *
    Math.max(amount - amountFree, 0)

  const finalValue =
    valueBeforeDiscount * (1 - (discount <= 1 ? discount : 0)) -
    (discount > 1 ? Math.abs(discount) : 0)

  return finalValue
}

export const calculateSubCategoryPrice = (
  subCategory: SubCategoryType,
  hideTimeUnit: boolean,
  timePeriodAmount: number,
  timePeriodUnit: TimeUnit,
): [number, number] => {
  if (Array.isArray(subCategory.amount)) {
    const minPrice =
      calculatePrice({
        amount: subCategory.amount?.[0] ?? 1,
        amountFree: subCategory.amountFree,
        discount: subCategory.discount,
        fixedPrice: subCategory.fixedPrice,
        price: subCategory.price ?? 0,
        timeAmount: hideTimeUnit ? 1 : timePeriodAmount,
        timeUnit: hideTimeUnit ? 'hours' : timePeriodUnit,
      }) || 0
    const maxPrice =
      calculatePrice({
        amount: subCategory.amount?.[1] ?? 1,
        amountFree: subCategory.amountFree,
        discount: subCategory.discount,
        fixedPrice: subCategory.fixedPrice,
        price: subCategory.price ?? 0,
        timeAmount: hideTimeUnit ? 1 : timePeriodAmount,
        timeUnit: hideTimeUnit ? 'hours' : timePeriodUnit,
      }) || 0

    return [minPrice, maxPrice]
  }
  const price =
    calculatePrice({
      amount: subCategory.amount ?? 1,
      amountFree: subCategory.amountFree,
      discount: subCategory.discount,
      fixedPrice: subCategory.fixedPrice,
      price: subCategory.price ?? 0,
      timeAmount: hideTimeUnit ? 1 : timePeriodAmount,
      timeUnit: hideTimeUnit ? 'hours' : timePeriodUnit,
    }) || 0

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

  const discountedPriceMin =
    category.discount && category.discount <= 1
      ? categoryPrice[0] * category.discount
      : categoryPrice[0] - (category.discount ?? 0)

  const discountedPriceMax =
    category.discount && category.discount <= 1
      ? categoryPrice[1] * category.discount
      : categoryPrice[1] - (category.discount ?? 0)

  const discountedPrice: [number, number] = category.allowNegative
    ? [discountedPriceMin, discountedPriceMax]
    : [Math.max(discountedPriceMin, 0), Math.max(discountedPriceMax, 0)]

  categoryPrice.map(price =>
    Math.max(
      category.discount && category.discount <= 1
        ? price * category.discount
        : price - (category.discount ?? 0),
      0,
    ),
  )

  return { categoryPrice, discountedPrice }
}

type DisplayPriceProps = {
  price: PriceTypeSingle
  beforeOrAfter: 'before' | 'after'
}

export const DisplayPrice = ({ price, beforeOrAfter }: DisplayPriceProps) => {
  const { localeFormat, currency, fractionDigits } =
    useContext(OrderSummaryContext)
  const withDiscount = beforeOrAfter === 'after' ? 'WithDiscount' : ''

  return price.totalPrice === price.maxPrice
    ? formatNumber(
        price[`totalPrice${withDiscount}`],
        localeFormat,
        currency,
        fractionDigits ?? 2,
      )
    : `${formatNumber(
        price[`totalPrice${withDiscount}`],
        localeFormat,
        currency,
        fractionDigits ?? 2,
      )} - ${formatNumber(
        price[`maxPrice${withDiscount}`],
        localeFormat,
        currency,
        fractionDigits ?? 2,
      )}`
}

import { useContext } from 'react'
import { Stack } from '../../../components/Layout/Stack'
import { Text } from '../../../components/Typography/Text'
import { calculateSubCategoryPrice, formatNumber } from '../helpers'
import { OrderSummaryContext } from '../Provider'
import type { SubCategoryType } from '../types'
import { orderSummaryStyle } from '../styles.css'

export const SubCategoryPrice = ({ subCategory }: { subCategory: SubCategoryType }) => {
  const { currency, localeFormat, hideTimeUnit, timePeriodAmount, timePeriodUnit, fractionDigits } =
    useContext(OrderSummaryContext)
  const format = (number: number) => formatNumber({ currency, fractionDigits, locale: localeFormat, number })
  const subCategoryPrice = calculateSubCategoryPrice({
    subCategory,
    hideTimeUnit,
    timePeriodAmount,
    timePeriodUnit,
  })

  const getCorrectPrice = (variant: 'discounted' | 'default', index: number) =>
    (subCategory.priceUnit ? subCategory.price : subCategoryPrice[variant][index])!

  return (
    <>
      {subCategory.price !== undefined &&
      !subCategory.hidePrice &&
      subCategoryPrice.default[0] === subCategoryPrice.discounted[0] &&
      subCategoryPrice.default[1] === subCategoryPrice.discounted[1] ? (
        <Text
          as="span"
          prominence="strong"
          sentiment="neutral"
          variant="bodySmallStrong"
          className={orderSummaryStyle.categoryPrice}
        >
          {subCategoryPrice.discounted[0] === subCategoryPrice.discounted[1] || subCategory.priceUnit
            ? format(getCorrectPrice('discounted', 0))
            : `${format(subCategoryPrice.discounted[0])} - ${format(subCategoryPrice.discounted[1])}`}
          {subCategory.priceUnit ? ` /${subCategory.priceUnit}` : ''}
        </Text>
      ) : null}
      {subCategory.price !== undefined &&
      !subCategory.hidePrice &&
      (subCategoryPrice.default[0] !== subCategoryPrice.discounted[0] ||
        subCategoryPrice.default[1] !== subCategoryPrice.discounted[1]) ? (
        <Stack alignItems="center" direction="row" gap={1}>
          <Text
            as="span"
            prominence="weak"
            sentiment="neutral"
            strikeThrough
            variant="bodySmallStrong"
            className={orderSummaryStyle.categoryPrice}
          >
            {subCategoryPrice.default[0] === subCategoryPrice.default[1] || subCategory.priceUnit
              ? format(getCorrectPrice('default', 0))
              : `${format(subCategoryPrice.default[0])} - ${format(subCategoryPrice.default[1])}`}
            {subCategory.priceUnit ? ` /${subCategory.priceUnit}` : ''}
          </Text>

          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodySmallStrong"
            className={orderSummaryStyle.categoryPrice}
          >
            {subCategoryPrice.discounted[0] === subCategoryPrice.discounted[1] || subCategory.priceUnit
              ? format(getCorrectPrice('discounted', 0))
              : `${format(subCategoryPrice.discounted[0])} - ${format(subCategoryPrice.discounted[1])}`}
            {subCategory.priceUnit ? ` /${subCategory.priceUnit}` : ''}
          </Text>
        </Stack>
      ) : null}
    </>
  )
}

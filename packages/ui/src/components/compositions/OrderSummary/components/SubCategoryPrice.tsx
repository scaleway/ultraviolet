import { useContext } from 'react'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { calculateSubCategoryPrice, formatNumber } from '../helpers'
import { OrderSummaryContext } from '../Provider'
import type { SubCategoryType } from '../types'

export const SubCategoryPrice = ({
  subCategory,
}: {
  subCategory: SubCategoryType
}) => {
  const {
    currency,
    localeFormat,
    hideTimeUnit,
    timePeriodAmount,
    timePeriodUnit,
    fractionDigits,
  } = useContext(OrderSummaryContext)
  const subCategoryPrice = calculateSubCategoryPrice(
    subCategory,
    hideTimeUnit,
    timePeriodAmount,
    timePeriodUnit,
  )

  const getCorrectPrice = (variant: 'discounted' | 'default', index: number) =>
    (subCategory.priceUnit
      ? subCategory.price
      : subCategoryPrice[variant][index])!

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
        >
          {subCategoryPrice.discounted[0] === subCategoryPrice.discounted[1] ||
          subCategory.priceUnit
            ? formatNumber(
                getCorrectPrice('discounted', 0),
                localeFormat,
                currency,
                fractionDigits,
              )
            : `${formatNumber(
                subCategoryPrice.discounted[0],
                localeFormat,
                currency,
                fractionDigits,
              )} - ${formatNumber(
                subCategoryPrice.discounted[1],
                localeFormat,
                currency,
                fractionDigits,
              )}`}
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
          >
            {subCategoryPrice.default[0] === subCategoryPrice.default[1] ||
            subCategory.priceUnit
              ? formatNumber(
                  getCorrectPrice('default', 0),
                  localeFormat,
                  currency,
                  fractionDigits,
                )
              : `${formatNumber(
                  subCategoryPrice.default[0],
                  localeFormat,
                  currency,
                  fractionDigits,
                )} - ${formatNumber(
                  subCategoryPrice.default[1],
                  localeFormat,
                  currency,
                  fractionDigits,
                )}`}
            {subCategory.priceUnit ? ` /${subCategory.priceUnit}` : ''}
          </Text>

          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodySmallStrong"
          >
            {subCategoryPrice.discounted[0] ===
              subCategoryPrice.discounted[1] || subCategory.priceUnit
              ? formatNumber(
                  getCorrectPrice('discounted', 0),
                  localeFormat,
                  currency,
                  fractionDigits,
                )
              : `${formatNumber(
                  subCategoryPrice.discounted[0],
                  localeFormat,
                  currency,
                  fractionDigits,
                )} - ${formatNumber(
                  subCategoryPrice.discounted[1],
                  localeFormat,
                  currency,
                  fractionDigits,
                )}`}
            {subCategory.priceUnit ? ` /${subCategory.priceUnit}` : ''}
          </Text>
        </Stack>
      ) : null}
    </>
  )
}

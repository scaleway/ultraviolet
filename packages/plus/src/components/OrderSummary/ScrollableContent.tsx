import styled from '@emotion/styled'
import { NumberInput, Stack, Text } from '@ultraviolet/ui'
import { useContext } from 'react'
import {
  calculateSubCategoryPrice,
  DisplayPrice,
  formatNumber,
} from './helpers'
import { OrderSummaryContext } from './Provider'
import type { ItemsType, SubCategoryType } from './types'

const StyledNumberInputV2 = styled(NumberInput)`
max-width: 12.5rem;
background-color: ${({ theme }) => theme.colors.neutral.background};
`
const ContainerScrollable = styled(Stack)`
overflow-y: scroll;
padding: ${({ theme }) => theme.space[3]};
height: 100%;
`

const DetailsStack = styled(Stack)`
padding-left: ${({ theme }) => theme.space[1]};
`
const CategoryStack = styled(Stack)`
  :not(:last-child){
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
    padding-bottom: ${({ theme }) => theme.space[3]};
  }
`
const CategoryName = ({ category }: { category: ItemsType }) => {
  const { categoriesPrice } = useContext(OrderSummaryContext)

  const categoryPrice = categoriesPrice[category.category] ?? {
    totalPrice: 0,
    totalPriceWithDiscount: 0,
    maxPrice: 0,
    maxPriceWithDiscount: 0,
    timeUnit: 'hours',
  }

  return category.category ? (
    <Stack justifyContent="space-between" direction="row" alignItems="center">
      {category.additionalInfo ? (
        <Stack direction="row" gap={1} alignItems="center">
          <Text
            as="span"
            variant="bodyStrong"
            sentiment="neutral"
            prominence="strong"
          >
            {category.category}
          </Text>
          <Text as="span" variant="bodySmall" italic sentiment="primary">
            {category.additionalInfo}
          </Text>
        </Stack>
      ) : (
        <Text
          as="span"
          variant="bodyStrong"
          sentiment="neutral"
          prominence="strong"
        >
          {category.category}
        </Text>
      )}
      {category.customContent}
      {category.numberInput ? (
        <StyledNumberInputV2
          value={category.numberInputValue}
          onChange={category.onChangeInput}
          size="small"
          controls={category.numberInputControls}
          unit={category.numberInputUnit}
        />
      ) : null}
      {!category.customContent &&
      !category.numberInput &&
      categoryPrice.totalPrice === categoryPrice.totalPriceWithDiscount ? (
        <Text
          as="span"
          variant="bodyStrong"
          sentiment="neutral"
          prominence="strong"
        >
          <DisplayPrice price={categoryPrice} beforeOrAfter="after" />
        </Text>
      ) : null}

      {!category.customContent &&
      !category.numberInput &&
      categoryPrice.totalPrice !== categoryPrice.totalPriceWithDiscount ? (
        <Stack direction="row" gap={1} alignItems="center">
          <Text
            as="span"
            variant="bodySmallStrong"
            sentiment="neutral"
            prominence="weak"
            strikeThrough
          >
            <DisplayPrice price={categoryPrice} beforeOrAfter="before" />
          </Text>
          <Text
            as="span"
            variant="bodyStrong"
            sentiment="neutral"
            prominence="strong"
          >
            <DisplayPrice price={categoryPrice} beforeOrAfter="after" />
          </Text>
        </Stack>
      ) : null}
    </Stack>
  ) : null
}

const SubCategory = ({ subCategory }: { subCategory: SubCategoryType }) => {
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

  return (
    <Stack direction="column" gap={1}>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        {subCategory.title ? (
          <Text
            as="span"
            variant="bodySmallStrong"
            sentiment="neutral"
            prominence="strong"
          >
            {subCategory.title}
          </Text>
        ) : null}
        {subCategory.customContent ? (
          <Text
            as="span"
            variant="bodySmallStrong"
            sentiment="neutral"
            prominence="strong"
          >
            {subCategory.customContent}
          </Text>
        ) : null}
        {subCategory.numberInput ? (
          <StyledNumberInputV2
            value={subCategory.numberInputValue}
            onChange={subCategory.onChangeInput}
            size="small"
            controls={subCategory.numberInputControls}
            unit={subCategory.numberInputUnit}
          />
        ) : null}
        {subCategory.price !== undefined && !subCategory.hidePrice ? (
          <Text
            as="span"
            variant="bodySmallStrong"
            sentiment="neutral"
            prominence="strong"
          >
            {subCategoryPrice[0] === subCategoryPrice[1] ||
            subCategory.priceUnit
              ? formatNumber(
                  subCategory.priceUnit
                    ? subCategory.price
                    : subCategoryPrice[0],
                  localeFormat,
                  currency,
                  fractionDigits,
                )
              : `${formatNumber(
                  subCategoryPrice[0],
                  localeFormat,
                  currency,
                  fractionDigits,
                )} - ${formatNumber(
                  subCategoryPrice[1],
                  localeFormat,
                  currency,
                  fractionDigits,
                )}`}
            {subCategory.priceUnit ? ` /${subCategory.priceUnit}` : ''}
          </Text>
        ) : null}
      </Stack>

      <DetailsStack direction="column" gap={0.5}>
        {subCategory.details?.map(detail =>
          detail ? (
            <Text
              key={detail}
              as="span"
              variant="bodySmall"
              sentiment="neutral"
            >
              {detail}
            </Text>
          ) : null,
        )}
      </DetailsStack>
    </Stack>
  )
}

export const ScrollableContent = () => {
  const { items } = useContext(OrderSummaryContext)

  return (
    <ContainerScrollable gap={3}>
      {items.map(category =>
        Object.keys(category).length > 0 && category.category ? (
          <CategoryStack key={category.category} gap={1.5}>
            <CategoryName category={category} />
            {category.subCategories &&
            Object.keys(category.subCategories).length > 0 ? (
              <Stack gap={1}>
                {category.subCategories.map((subCategory, index) => (
                  <SubCategory
                    key={subCategory.title ?? `${index}`}
                    subCategory={subCategory}
                  />
                ))}
              </Stack>
            ) : null}
          </CategoryStack>
        ) : null,
      )}
    </ContainerScrollable>
  )
}

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
  min-height: 10rem;
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
    maxPrice: 0,
    maxPriceWithDiscount: 0,
    timeUnit: 'hours',
    totalPrice: 0,
    totalPriceWithDiscount: 0,
  }

  return category.category ? (
    <Stack alignItems="center" direction="row" justifyContent="space-between">
      {category.additionalInfo ? (
        <Stack alignItems="center" direction="row" gap={1}>
          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodyStrong"
          >
            {category.category}
          </Text>
          <Text as="span" italic sentiment="primary" variant="bodySmall">
            {category.additionalInfo}
          </Text>
        </Stack>
      ) : (
        <Text
          as="span"
          prominence="strong"
          sentiment="neutral"
          variant="bodyStrong"
        >
          {category.category}
        </Text>
      )}
      {category.customContent}
      {category.numberInput ? (
        <StyledNumberInputV2
          controls={category.numberInputControls}
          onChange={category.onChangeInput}
          size="small"
          unit={category.numberInputUnit}
          value={category.numberInputValue}
        />
      ) : null}
      {!category.customContent &&
      !category.numberInput &&
      categoryPrice.totalPrice === categoryPrice.totalPriceWithDiscount ? (
        <Text
          as="span"
          prominence="strong"
          sentiment="neutral"
          variant="bodyStrong"
        >
          <DisplayPrice beforeOrAfter="after" price={categoryPrice} />
        </Text>
      ) : null}

      {!category.customContent &&
      !category.numberInput &&
      categoryPrice.totalPrice !== categoryPrice.totalPriceWithDiscount ? (
        <Stack alignItems="center" direction="row" gap={1}>
          <Text
            as="span"
            prominence="weak"
            sentiment="neutral"
            strikeThrough
            variant="bodySmallStrong"
          >
            <DisplayPrice beforeOrAfter="before" price={categoryPrice} />
          </Text>
          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodyStrong"
          >
            <DisplayPrice beforeOrAfter="after" price={categoryPrice} />
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
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        {subCategory.title ? (
          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodySmallStrong"
          >
            {subCategory.title}
          </Text>
        ) : null}
        {subCategory.customContent ? (
          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodySmallStrong"
          >
            {subCategory.customContent}
          </Text>
        ) : null}
        {subCategory.numberInput ? (
          <StyledNumberInputV2
            controls={subCategory.numberInputControls}
            onChange={subCategory.onChangeInput}
            size="small"
            unit={subCategory.numberInputUnit}
            value={subCategory.numberInputValue}
          />
        ) : null}
        {subCategory.price !== undefined && !subCategory.hidePrice ? (
          <Text
            as="span"
            prominence="strong"
            sentiment="neutral"
            variant="bodySmallStrong"
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
              as="span"
              key={detail}
              sentiment="neutral"
              variant="bodySmall"
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
          <CategoryStack gap={1.5} key={category.category}>
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

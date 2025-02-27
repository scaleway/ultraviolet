import styled from '@emotion/styled'
import { NumberInputV2, Stack, Text } from '@ultraviolet/ui'
import { useContext } from 'react'
import { OrderSummaryContext } from './Provider'
import { calculatePrice, formatNumber } from './helpers'
import type { ItemsType, SubCategoryType } from './types'

const StyledNumberInputV2 = styled(NumberInputV2)`
max-width: 200px;
background-color: ${({ theme }) => theme.colors.neutral.background};
`
const ContainerScrollable = styled(Stack)`
max-height: 30rem;
overflow-y: scroll;
padding: ${({ theme }) => theme.space[3]};
`

const DetailsStack = styled(Stack)`
padding-left: ${({ theme }) => theme.space[1]};
`
const CategoryStack = styled(Stack)`
  :not(:last-child){
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
    padding-bottom: ${({ theme }) => theme.space[1.5]};
  }
`
const CategoryName = ({ category }: { category: ItemsType }) => {
  const { currency, localeFormat, categoriesPrice, fractionDigits } =
    useContext(OrderSummaryContext)

  return (
    <Stack justifyContent="space-between" direction="row" alignItems="center">
      {category.additionalInfo ? (
        <Stack direction="row" gap={1} alignItems="center">
          <Text as="span" variant="bodyStrong" sentiment="neutral">
            {category.category}
          </Text>
          <Text as="span" variant="bodySmall" italic sentiment="primary">
            {category.additionalInfo}
          </Text>
        </Stack>
      ) : (
        <Text as="span" variant="bodyStrong" sentiment="neutral">
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
      {!category.customContent && !category.numberInput ? (
        <Text as="span" variant="bodyStrong" sentiment="neutral">
          {formatNumber(
            categoriesPrice[category.category] ?? 0,
            localeFormat,
            currency,
            fractionDigits,
          )}
        </Text>
      ) : null}
    </Stack>
  )
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

  return (
    <Stack direction="column" gap={1}>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        {subCategory.title ? (
          <Text as="span" variant="bodySmallStrong" sentiment="neutral">
            {subCategory.title}
          </Text>
        ) : null}
        {subCategory.customContent ? (
          <Text as="span" variant="bodySmallStrong" sentiment="neutral">
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
          <Text as="span" variant="bodySmallStrong" sentiment="neutral">
            {formatNumber(
              calculatePrice(
                subCategory.price ?? 0,
                subCategory.amount && !subCategory.priceUnit
                  ? subCategory.amount
                  : 1,
                subCategory.priceUnit ? 0 : subCategory.amountFree,
                hideTimeUnit ? 'hours' : timePeriodUnit,
                hideTimeUnit ? 1 : timePeriodAmount,
                subCategory.discount,
                subCategory.fixedPrice,
              ),
              localeFormat,
              currency,
              fractionDigits,
            )}
            {subCategory.priceUnit ? ` /${subCategory.priceUnit}` : ''}
          </Text>
        ) : null}
      </Stack>

      <DetailsStack direction="column" gap={0.5}>
        {subCategory.details?.map(detail => (
          <Text key={detail} as="span" variant="bodySmall" sentiment="neutral">
            {detail}
          </Text>
        ))}
      </DetailsStack>
    </Stack>
  )
}

export const ScrollableContent = () => {
  const { items } = useContext(OrderSummaryContext)

  return (
    <ContainerScrollable gap={3}>
      {items.map(category =>
        Object.keys(category).length > 0 ? (
          <CategoryStack key={category.category} gap={1.5}>
            <CategoryName category={category} />
            <Stack gap={1}>
              {category.subCategories &&
              Object.keys(category.subCategories).length > 0
                ? category.subCategories.map((subCategory, index) => (
                    <SubCategory
                      key={subCategory.title ?? `${index}`}
                      subCategory={subCategory}
                    />
                  ))
                : null}
            </Stack>
          </CategoryStack>
        ) : null,
      )}
    </ContainerScrollable>
  )
}

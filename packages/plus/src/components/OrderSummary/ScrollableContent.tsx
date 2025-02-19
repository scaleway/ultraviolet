import styled from '@emotion/styled'
import { Stack, Text } from '@ultraviolet/ui'
import { useContext } from 'react'
import { OrderSummaryContext } from './Provider'
import { calculatePrice, formatNumber } from './helpers'
import type { ItemsType, SubCategoryType } from './types'

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
  const { currency, localeFormat, categoriesPrice } =
    useContext(OrderSummaryContext)

  return (
    <Stack justifyContent="space-between" direction="row">
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
      {category.customContent ?? (
        <Text as="span" variant="bodyStrong" sentiment="neutral">
          {formatNumber(
            categoriesPrice[category.category],
            localeFormat,
            currency,
          )}
        </Text>
      )}
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
  } = useContext(OrderSummaryContext)

  return (
    <Stack direction="column" gap={1}>
      <Stack justifyContent="space-between" direction="row">
        <Text as="span" variant="bodySmallStrong" sentiment="neutral">
          {subCategory.title}
        </Text>
        {subCategory.customContent ? (
          <Text as="span" variant="bodySmallStrong" sentiment="neutral">
            {subCategory.customContent}
          </Text>
        ) : null}
        {subCategory.price !== undefined ? (
          <Text as="span" variant="bodySmallStrong" sentiment="neutral">
            {formatNumber(
              calculatePrice(
                subCategory.price ?? 0,
                subCategory.amount && !subCategory.priceUnit
                  ? subCategory.amount
                  : 1,
                subCategory.amountFree,
                hideTimeUnit ? 'hours' : timePeriodUnit,
                hideTimeUnit ? 1 : timePeriodAmount,
                subCategory.discount,
                subCategory.fixedPrice,
              ),
              localeFormat,
              currency,
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
      {items.map(category => (
        <CategoryStack key={category.category} gap={1.5}>
          <CategoryName category={category} />
          <Stack>
            {category.subCategories?.map(subCategory => (
              <SubCategory key={subCategory.title} subCategory={subCategory} />
            ))}
          </Stack>
        </CategoryStack>
      ))}
    </ContainerScrollable>
  )
}

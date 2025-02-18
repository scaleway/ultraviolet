import styled from '@emotion/styled'
import { InformationOutlineIcon } from '@ultraviolet/icons'
import { Stack, Text } from '@ultraviolet/ui'
import { useContext } from 'react'
import { OrderSummaryContext } from './Provider'
import { calculatePrice, formatNumber } from './helpers'
import type { DetailsType, ItemsType } from './types'

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
  const { currency, locale, categoriesPrice } = useContext(OrderSummaryContext)

  return (
    <Stack justifyContent="space-between" direction="row">
      {category.additionalInfo ? (
        <Stack direction="row" gap={1} alignItems="center">
          <Text as="span" variant="bodyStrong" sentiment="neutral">
            {category.category}
          </Text>
          <InformationOutlineIcon size="small" />
          <Text as="span" variant="bodySmall" italic sentiment="primary">
            {category.additionalInfo}
          </Text>
        </Stack>
      ) : (
        <Text as="span" variant="bodyStrong" sentiment="neutral">
          {category.category}
        </Text>
      )}

      <Text as="span" variant="bodyStrong" sentiment="neutral">
        {formatNumber(categoriesPrice[category.category], locale, currency)}
      </Text>
    </Stack>
  )
}

const SubCategory = ({ subCategory }: { subCategory: DetailsType }) => {
  const { currency, locale, hideTimeUnit, timePeriodAmount, timePeriodUnit } =
    useContext(OrderSummaryContext)

  return (
    <Stack direction="column" gap={1}>
      <Stack justifyContent="space-between" direction="row">
        <Text as="span" variant="bodySmallStrong" sentiment="neutral">
          {subCategory.title}
        </Text>
        {subCategory.info ? (
          <Text as="span" variant="bodySmallStrong" sentiment="neutral">
            {subCategory.info}
          </Text>
        ) : null}
        {subCategory.price !== undefined ? (
          <Text as="span" variant="bodySmallStrong" sentiment="neutral">
            {formatNumber(
              calculatePrice(
                subCategory.price ?? 0,
                subCategory.amount ?? 1,
                subCategory.amountFree,
                hideTimeUnit ? 'minutes' : timePeriodUnit,
                hideTimeUnit ? 1 : timePeriodAmount,
                subCategory.discount,
              ),
              locale,
              currency,
            )}
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
          <Stack gap={1.5}>
            {category.subCategories.map(subCategory => (
              <SubCategory key={subCategory.title} subCategory={subCategory} />
            ))}
          </Stack>
        </CategoryStack>
      ))}
    </ContainerScrollable>
  )
}

import styled from '@emotion/styled'
import { Stack, Text } from '@ultraviolet/ui'
import { useContext } from 'react'
import type { ReactNode } from 'react'
import { OrderSummaryContext } from './Provider'
import { DisplayPrice } from './helpers'
import type { PriceTypeSingle, TimeUnit } from './types'

const NonScrollableContainer = styled(Stack)`
padding: ${({ theme }) => theme.space[3]};
border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
`

type NonScrollableContentProps = {
  discount: number
  totalPrice: PriceTypeSingle
  footer: ReactNode
  children: ReactNode
  totalPriceInfo?: ReactNode
  hideDetails: boolean
  unit: TimeUnit
}

export const NonScrollableContent = ({
  totalPrice,
  footer,
  children,
  totalPriceInfo,
  hideDetails,
  unit,
}: NonScrollableContentProps) => {
  const { locales } = useContext(OrderSummaryContext)

  return (
    <NonScrollableContainer gap={3}>
      {children}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {totalPriceInfo ? (
          <Stack>
            <Text as="p" variant="bodyStrong" sentiment="neutral">
              {locales['order.summary.total']}:
            </Text>
            {totalPriceInfo}
          </Stack>
        ) : (
          <Text as="p" variant="bodyStrong" sentiment="neutral">
            {locales['order.summary.total']}:
          </Text>
        )}
        {totalPrice.totalPrice === totalPrice.totalPriceWithDiscount ? (
          <Text
            as="p"
            variant="headingSmallStrong"
            sentiment="neutral"
            data-testid="total-price"
          >
            <DisplayPrice price={totalPrice} beforeOrAfter="after" />
            {hideDetails ? `/${unit}` : null}
          </Text>
        ) : (
          <Stack direction="row" gap={1} alignItems="center">
            <Text
              as="p"
              variant="bodySmallStrong"
              sentiment="neutral"
              prominence="weak"
              strikeThrough
            >
              <DisplayPrice price={totalPrice} beforeOrAfter="before" />
            </Text>
            <Text
              as="p"
              variant="headingSmallStrong"
              sentiment="neutral"
              data-testid="total-price"
            >
              <DisplayPrice price={totalPrice} beforeOrAfter="after" />
              {hideDetails ? `/${unit}` : null}
            </Text>
          </Stack>
        )}
      </Stack>
      {footer}
    </NonScrollableContainer>
  )
}

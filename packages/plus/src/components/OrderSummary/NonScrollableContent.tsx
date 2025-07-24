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
  totalPriceDescription?: ReactNode
  additionalInfo?: string
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
  totalPriceDescription,
  additionalInfo,
}: NonScrollableContentProps) => {
  const { locales } = useContext(OrderSummaryContext)

  return (
    <NonScrollableContainer gap={3}>
      {children}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {totalPriceInfo ? (
          <Stack>
            <Stack direction="row" gap={1} alignItems="center">
              <Text
                as="span"
                variant="bodyStrong"
                sentiment="neutral"
                prominence="strong"
              >
                {locales['order.summary.total']}:
              </Text>
              {totalPriceDescription}
            </Stack>
            {totalPriceInfo}
          </Stack>
        ) : (
          <Stack direction="row" gap={1} alignItems="center">
            <Text
              as="span"
              variant="bodyStrong"
              sentiment="neutral"
              prominence="strong"
            >
              {locales['order.summary.total']}
              {additionalInfo ? ` ${additionalInfo}` : null}:
            </Text>
            {totalPriceDescription}
          </Stack>
        )}
        {totalPrice.totalPrice === totalPrice.totalPriceWithDiscount ? (
          <Text
            as="span"
            variant="headingSmallStrong"
            sentiment="neutral"
            data-testid="total-price"
            prominence="strong"
          >
            <DisplayPrice price={totalPrice} beforeOrAfter="after" />
            {hideDetails ? `/${unit}` : null}
          </Text>
        ) : (
          <Stack direction="row" gap={1} alignItems="center">
            <Text
              as="span"
              variant="bodySmallStrong"
              sentiment="neutral"
              prominence="weak"
              strikeThrough
            >
              <DisplayPrice price={totalPrice} beforeOrAfter="before" />
            </Text>
            <Text
              as="span"
              variant="headingSmallStrong"
              sentiment="neutral"
              data-testid="total-price"
              prominence="strong"
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

import styled from '@emotion/styled'
import { Stack, Text } from '@ultraviolet/ui'
import { useContext } from 'react'
import type { ReactNode } from 'react'
import { OrderSummaryContext } from './Provider'
import { formatNumber } from './helpers'

const NonScrollableContainer = styled(Stack)`
padding: ${({ theme }) => theme.space[3]};
border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
`

type NonScrollableContentProps = {
  discount: number
  totalPrice: { before: number; after: number }
  footer: ReactNode
  children: ReactNode
  totalPriceInfo?: ReactNode
}

export const NonScrollableContent = ({
  totalPrice,
  footer,
  children,
  totalPriceInfo,
}: NonScrollableContentProps) => {
  const { localeFormat, currency, locales } = useContext(OrderSummaryContext)

  return (
    <NonScrollableContainer gap={3}>
      {children}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {totalPriceInfo ? (
          <Stack>
            <Text as="p" variant="bodyStrong" sentiment="neutral">
              {locales['estimate.cost.total']}:
            </Text>
            {totalPriceInfo}
          </Stack>
        ) : (
          <Text as="p" variant="bodyStrong" sentiment="neutral">
            {locales['estimate.cost.total']}:
          </Text>
        )}
        {totalPrice.before === totalPrice.after ? (
          <Text
            as="p"
            variant="headingSmallStrong"
            sentiment="neutral"
            data-testid="total-price"
          >
            {formatNumber(totalPrice.after, localeFormat, currency, 2)}
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
              {formatNumber(totalPrice.before, localeFormat, currency, 2)}
            </Text>
            <Text
              as="p"
              variant="headingSmallStrong"
              sentiment="neutral"
              data-testid="total-price"
            >
              {formatNumber(totalPrice.after, localeFormat, currency, 2)}
            </Text>
          </Stack>
        )}
      </Stack>
      {footer}
    </NonScrollableContainer>
  )
}

import styled from '@emotion/styled'
import { Button, Stack, Text } from '@ultraviolet/ui'
import { useContext } from 'react'
import type { MouseEventHandler, ReactNode } from 'react'
import { OrderSummaryContext } from './Provider'
import { formatNumber } from './helpers'

const NonScrollableContainer = styled(Stack)`
padding: ${({ theme }) => theme.space[3]};
border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
`

type NonScrollableContentProps = {
  discount: number
  totalPrice: number
  validateButtonOnClick: MouseEventHandler<HTMLElement>
  footer: ReactNode
  children: ReactNode
  totalPriceInfo?: ReactNode
}

export const NonScrollableContent = ({
  totalPrice,
  validateButtonOnClick,
  footer,
  children,
  totalPriceInfo,
}: NonScrollableContentProps) => {
  const { locale, currency, locales } = useContext(OrderSummaryContext)

  return (
    <NonScrollableContainer gap={3}>
      {children}
      <Stack direction="row" justifyContent="space-between">
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

        <Text as="p" variant="headingSmallStrong" sentiment="neutral">
          {formatNumber(totalPrice, locale, currency)}
        </Text>
      </Stack>
      {footer}
      <Button onClick={validateButtonOnClick}>
        {locales['estimate.cost.submit.label']}
      </Button>
    </NonScrollableContainer>
  )
}

import { Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { useContext } from 'react'
import { DisplayPrice } from './helpers'
import { OrderSummaryContext } from './Provider'
import { orderSummaryNonScrollableContainer } from './styles.css'
import type { PriceTypeSingle, TimeUnit } from './types'

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
    <Stack className={orderSummaryNonScrollableContainer} gap={3}>
      {children}
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        {totalPriceInfo ? (
          <Stack>
            <Stack alignItems="center" direction="row" gap={1}>
              <Text
                as="span"
                prominence="strong"
                sentiment="neutral"
                variant="bodyStrong"
              >
                {locales['order.summary.total']}:
              </Text>
              {totalPriceDescription}
            </Stack>
            {totalPriceInfo}
          </Stack>
        ) : (
          <Stack alignItems="center" direction="row" gap={1}>
            <Text
              as="span"
              prominence="strong"
              sentiment="neutral"
              variant="bodyStrong"
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
            data-testid="total-price"
            prominence="strong"
            sentiment="neutral"
            variant="headingSmallStrong"
          >
            <DisplayPrice beforeOrAfter="after" price={totalPrice} />
            {hideDetails ? `/${unit}` : null}
          </Text>
        ) : (
          <Stack alignItems="center" direction="row" gap={1}>
            <Text
              as="span"
              prominence="weak"
              sentiment="neutral"
              strikeThrough
              variant="bodySmallStrong"
            >
              <DisplayPrice beforeOrAfter="before" price={totalPrice} />
            </Text>
            <Text
              as="span"
              data-testid="total-price"
              prominence="strong"
              sentiment="neutral"
              variant="headingSmallStrong"
            >
              <DisplayPrice beforeOrAfter="after" price={totalPrice} />
              {hideDetails ? `/${unit}` : null}
            </Text>
          </Stack>
        )}
      </Stack>
      {footer}
    </Stack>
  )
}

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
  totalPriceInfoPlacement?: 'left' | 'right'
  totalPriceDescription?: ReactNode
  additionalInfo?: string
  hideDetails: boolean
  unit: TimeUnit
  priceInformation?: ReactNode
  hideBeforePrice?: boolean
}

export const NonScrollableContent = ({
  totalPrice,
  footer,
  children,
  totalPriceInfo,
  totalPriceInfoPlacement,
  hideDetails,
  unit,
  totalPriceDescription,
  additionalInfo,
  priceInformation,
  hideBeforePrice,
}: NonScrollableContentProps) => {
  const { locales } = useContext(OrderSummaryContext)

  return (
    <Stack className={orderSummaryNonScrollableContainer} gap={3}>
      {children}
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        {totalPriceInfo && totalPriceInfoPlacement === 'left' ? (
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
        <Stack alignItems="end" direction="column">
          {totalPrice.totalPrice === totalPrice.totalPriceWithDiscount ||
          hideBeforePrice ? (
            <Text
              as="span"
              data-testid="total-price"
              prominence="strong"
              sentiment="neutral"
              variant="headingSmallStrong"
            >
              <DisplayPrice beforeOrAfter="after" price={totalPrice} />
              {hideDetails && !priceInformation ? `/${unit}` : null}
              {priceInformation}
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
                {hideDetails && !priceInformation ? `/${unit}` : null}
                {priceInformation}
              </Text>
            </Stack>
          )}
          {totalPriceInfo && totalPriceInfoPlacement === 'right'
            ? totalPriceInfo
            : null}
        </Stack>
      </Stack>
      {footer}
    </Stack>
  )
}

import type { ReactNode } from 'react'
import { useContext } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { DisplayPrice } from './helpers'
import { OrderSummaryContext } from './Provider'
import {
  orderSummaryNonScrollableContainer,
  orderSummaryTotalPrice,
} from './styles.css'
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
  unit: TimeUnit
  priceInformation?: ReactNode
  hideBeforePrice?: boolean
  defaultPriceInformation: boolean
  timePeriodAmount: number
}

export const NonScrollableContent = ({
  totalPrice,
  footer,
  children,
  totalPriceInfo,
  totalPriceInfoPlacement,
  unit,
  totalPriceDescription,
  additionalInfo,
  priceInformation,
  hideBeforePrice,
  defaultPriceInformation,
  timePeriodAmount,
}: NonScrollableContentProps) => {
  const { locales } = useContext(OrderSummaryContext)
  const unitSingular = unit.endsWith('s') ? unit.slice(0, -1) : unit
  const divisor = defaultPriceInformation ? timePeriodAmount : undefined

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
        <Stack alignItems="flex-end" direction="column">
          {totalPrice.totalPrice === totalPrice.totalPriceWithDiscount ||
          hideBeforePrice ? (
            <Text
              as="span"
              className={
                orderSummaryTotalPrice[
                  defaultPriceInformation && !priceInformation
                    ? 'default'
                    : 'priceInformation'
                ]
              }
              data-testid="total-price"
              prominence="strong"
              sentiment="neutral"
              variant="headingSmallStrong"
            >
              <DisplayPrice
                beforeOrAfter="after"
                divisor={divisor}
                price={totalPrice}
              />
              {defaultPriceInformation ? `/${unitSingular}` : null}
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
                <DisplayPrice
                  beforeOrAfter="before"
                  divisor={divisor}
                  price={totalPrice}
                />
              </Text>
              <Text
                as="span"
                className={
                  orderSummaryTotalPrice[
                    priceInformation ? 'priceInformation' : 'default'
                  ]
                }
                data-testid="total-price"
                prominence="strong"
                sentiment="neutral"
                variant="headingSmallStrong"
              >
                <DisplayPrice
                  beforeOrAfter="after"
                  divisor={divisor}
                  price={totalPrice}
                />
                {defaultPriceInformation ? `/${unitSingular}` : null}
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

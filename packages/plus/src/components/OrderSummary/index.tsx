import { cn } from '@ultraviolet/themes'
import { Stack, Text, UnitInput } from '@ultraviolet/ui'
import { useEffect, useMemo, useState } from 'react'
import { Units } from './constants'
import { calculateCategoryPrice } from './helpers'
import orderSummaryLocales from './locales/en'
import { NonScrollableContent } from './NonScrollableContent'
import { OrderSummaryContext } from './Provider'
import { ScrollableContent } from './ScrollableContent'
import {
  orderSummaryContainer,
  orderSummaryHeaderContainer,
  orderSummaryStackBackground,
} from './styles.css'
import type { OrderSummaryProps, PriceType, TimeUnit } from './types'

export const OrderSummary = ({
  header,
  hideTimeUnit = false,
  periodOptions = Units,
  valueUnitInput = 1,
  unitUnitInput = 'hours',
  items,
  locales = orderSummaryLocales,
  currency = 'EUR',
  localeFormat = 'en-US',
  footer,
  children,
  discount = 0,
  totalPriceInfo,
  fractionDigits,
  hideDetails = false,
  onChange,
  onChangeUnitInput,
  totalPriceDescription,
  additionalInfo,
  className,
  totalPriceInfoPlacement = 'left',
  hideBeforePrice = false,
  'data-testid': dataTestId,
  style,
  priceInformation,
}: OrderSummaryProps) => {
  const [timePeriodUnit, setTimePeriodUnit] = useState<TimeUnit>(unitUnitInput)
  const [timePeriodAmount, setTimePeriodAmount] = useState(valueUnitInput)

  const categoriesPrice = useMemo(
    () =>
      items.reduce<PriceType>((acc, category) => {
        const { categoryPrice, discountedPrice } = calculateCategoryPrice(
          category,
          hideTimeUnit,
          timePeriodAmount,
          timePeriodUnit,
        )

        return {
          ...acc,
          [category.category]: {
            maxPrice: categoryPrice[1],
            maxPriceWithDiscount: discountedPrice[1],
            timeUnit: unitUnitInput,
            totalPrice: categoryPrice[0],
            totalPriceWithDiscount: discountedPrice[0],
          },
        }
      }, {}),
    [hideTimeUnit, items, timePeriodAmount, timePeriodUnit, unitUnitInput],
  )

  const totalPrice = useMemo(() => {
    const price = Object.values(categoriesPrice).reduce<[number, number]>(
      (acc, categoryPrice) => [
        acc[0] + categoryPrice.totalPriceWithDiscount,
        acc[1] + categoryPrice.maxPriceWithDiscount,
      ],
      [0, 0],
    )

    const computedPrice = {
      maxPrice: Math.max(price[1], 0),
      maxPriceWithDiscount: Math.max(
        price[1] * (discount <= 1 ? 1 - discount : 1) -
          (discount > 1 ? Math.abs(discount) : 0),
        0,
      ),
      timeUnit: unitUnitInput,
      totalPrice: Math.max(price[0], 0),
      totalPriceWithDiscount: Math.max(
        price[0] * (discount <= 1 ? 1 - discount : 1) -
          (discount > 1 ? Math.abs(discount) : 0),
        0,
      ),
    }

    return computedPrice
  }, [categoriesPrice, discount, unitUnitInput])

  const valueContext = useMemo(
    () => ({
      categoriesPrice,
      currency,
      fractionDigits,
      hideTimeUnit,
      items,
      localeFormat,
      locales,
      timePeriodAmount,
      timePeriodUnit,
    }),
    [
      currency,
      localeFormat,
      items,
      categoriesPrice,
      hideTimeUnit,
      timePeriodUnit,
      timePeriodAmount,
      locales,
      fractionDigits,
    ],
  )

  const computePeriodOptions = useMemo(() => {
    const computedPeriodOptions: { label: string; value: string }[] = []

    periodOptions.forEach(option =>
      computedPeriodOptions.push({
        label: locales[`order.summary.units.${option}.label` as const],
        value: option,
      }),
    )

    return computedPeriodOptions
  }, [periodOptions, locales])

  useEffect(() => {
    onChange?.(categoriesPrice, totalPrice)
  }, [categoriesPrice, totalPrice, onChange])

  return (
    <OrderSummaryContext.Provider value={valueContext}>
      <Stack
        className={cn(className, orderSummaryContainer)}
        data-testId={dataTestId}
        justifyContent={hideDetails ? 'flex-start' : 'space-between'}
        style={style}
      >
        {header ? (
          <Stack
            alignItems="center"
            className={
              orderSummaryHeaderContainer[
                hideDetails ? 'hideDetails' : 'showDetails'
              ]
            }
            direction="row"
            gap={2}
            justifyContent="space-between"
          >
            <Text
              as="h3"
              prominence="strong"
              sentiment="neutral"
              variant="headingSmallStrong"
            >
              {header}
            </Text>
            {!hideTimeUnit && !hideDetails ? (
              <Stack className={orderSummaryStackBackground}>
                <UnitInput
                  dropdownAlign="center"
                  maxWidth="200px"
                  onChange={value => {
                    setTimePeriodAmount(value)
                  }}
                  onChangeUnitValue={(val: string) => {
                    setTimePeriodUnit(val as TimeUnit)
                    onChangeUnitInput?.(val)
                  }}
                  options={computePeriodOptions}
                  selectInputWidth="100%"
                  size="small"
                  templateColumns="2fr 3fr"
                  unitValue={unitUnitInput}
                  value={valueUnitInput}
                />
              </Stack>
            ) : null}
          </Stack>
        ) : null}
        {!hideDetails ? <ScrollableContent /> : null}
        <NonScrollableContent
          additionalInfo={additionalInfo}
          discount={discount}
          footer={footer}
          hideBeforePrice={hideBeforePrice}
          hideDetails={hideDetails}
          priceInformation={priceInformation}
          totalPrice={totalPrice}
          totalPriceDescription={totalPriceDescription}
          totalPriceInfo={totalPriceInfo}
          totalPriceInfoPlacement={totalPriceInfoPlacement}
          unit={unitUnitInput}
        >
          {children}
        </NonScrollableContent>
      </Stack>
    </OrderSummaryContext.Provider>
  )
}

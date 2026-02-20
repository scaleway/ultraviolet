import { cn } from '@ultraviolet/utils'
import { useEffect, useMemo, useState } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { UnitInput } from '../../UnitInput'
import { Units } from './constants'
import { computeCategoriesPrice, computeTotalPrice } from './helpers'
import orderSummaryLocales from './locales/en'
import { NonScrollableContent } from './NonScrollableContent'
import { OrderSummaryContext } from './Provider'
import { ScrollableContent } from './ScrollableContent'
import {
  orderSummaryContainer,
  orderSummaryHeaderContainer,
  orderSummaryStackBackground,
} from './styles.css'
import type { OrderSummaryProps, TimeUnit } from './types'

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
      computeCategoriesPrice(
        items,
        hideTimeUnit,
        timePeriodAmount,
        timePeriodUnit,
      ),
    [hideTimeUnit, items, timePeriodAmount, timePeriodUnit],
  )

  const unitaryCategoriesPrice = useMemo(
    () => computeCategoriesPrice(items, hideTimeUnit, 1, 'hours'),
    [items, hideTimeUnit],
  )

  const totalPrice = useMemo(
    () => computeTotalPrice(categoriesPrice, discount, timePeriodUnit),
    [timePeriodUnit, categoriesPrice, discount],
  )

  const unitaryTotalPrice = useMemo(
    () => computeTotalPrice(unitaryCategoriesPrice, discount, 'hours'),
    [discount, unitaryCategoriesPrice],
  )

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

    for (const option of periodOptions) {
      computedPeriodOptions.push({
        label: locales[`order.summary.units.${option}.label` as const],
        value: option,
      })
    }

    return computedPeriodOptions
  }, [periodOptions, locales])

  useEffect(() => {
    onChange?.(
      categoriesPrice,
      totalPrice,
      unitaryCategoriesPrice,
      unitaryTotalPrice,
    )
  }, [
    categoriesPrice,
    totalPrice,
    onChange,
    unitaryTotalPrice,
    unitaryCategoriesPrice,
  ])

  return (
    <OrderSummaryContext.Provider value={valueContext}>
      <Stack
        className={cn(className, orderSummaryContainer)}
        data-testid={dataTestId}
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
            {hideTimeUnit || hideDetails ? null : (
              <Stack className={orderSummaryStackBackground}>
                <UnitInput
                  dropdownAlign="center"
                  maxWidth="200px"
                  onChange={value => {
                    setTimePeriodAmount(value)
                    onChangeUnitInput?.(timePeriodUnit, value)
                  }}
                  onChangeUnitValue={(val: string) => {
                    setTimePeriodUnit(val as TimeUnit)
                    onChangeUnitInput?.(val, timePeriodAmount)
                  }}
                  options={computePeriodOptions}
                  selectInputWidth="100%"
                  size="small"
                  templateColumns="2fr 3fr"
                  unitValue={unitUnitInput}
                  value={valueUnitInput}
                />
              </Stack>
            )}
          </Stack>
        ) : null}
        {hideDetails ? null : <ScrollableContent />}
        <NonScrollableContent
          additionalInfo={additionalInfo}
          defaultPriceInformation={
            priceInformation === true ||
            (hideDetails && !priceInformation && priceInformation !== false)
          }
          discount={discount}
          footer={footer}
          hideBeforePrice={hideBeforePrice}
          priceInformation={priceInformation}
          timePeriodAmount={timePeriodAmount}
          totalPrice={totalPrice}
          totalPriceDescription={totalPriceDescription}
          totalPriceInfo={totalPriceInfo}
          totalPriceInfoPlacement={totalPriceInfoPlacement}
          unit={timePeriodUnit}
        >
          {children}
        </NonScrollableContent>
      </Stack>
    </OrderSummaryContext.Provider>
  )
}

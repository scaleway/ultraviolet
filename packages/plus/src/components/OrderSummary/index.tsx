import styled from '@emotion/styled'
import { Stack, Text, UnitInput } from '@ultraviolet/ui'
import { useEffect, useMemo, useState } from 'react'
import { NonScrollableContent } from './NonScrollableContent'
import { OrderSummaryContext } from './Provider'
import { ScrollableContent } from './ScrollableContent'
import { Units } from './constants'
import { calculateCategoryPrice } from './helpers'
import orderSummaryLocales from './locales/en'
import type { OrderSummaryProps, PriceType, TimeUnit } from './types'

const Container = styled(Stack)`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-inline: 1px solid ${({ theme }) => theme.colors.neutral.border};
  height: 100%;
  width: 320px;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    width: 27.5rem;
  }

`

const HeaderContainer = styled(Stack)<{ 'data-hideDetails': boolean }>`
  height: ${({ theme }) => theme.sizing[900]};
  padding: ${({ theme }) => theme.space[3]};
  padding-bottom: ${({ theme }) => theme.space[2]};

  &[data-hideDetails="false"] {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  }
`

const StyledStack = styled(Stack)`
  background-color: ${({ theme }) => theme.colors.neutral.background};
  width: 11rem;
`

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
            totalPrice: categoryPrice[0],
            totalPriceWithDiscount: discountedPrice[0],
            timeUnit: unitUnitInput,
          },
        }
      }, {}),
    [hideTimeUnit, items, timePeriodAmount, timePeriodUnit, unitUnitInput],
  ) satisfies PriceType

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
        price[1] * (discount < 1 ? 1 - discount : 1) -
          (discount >= 1 ? Math.abs(discount) : 0),
        0,
      ),
      totalPrice: Math.max(price[0], 0),
      totalPriceWithDiscount: Math.max(
        price[0] * (discount < 1 ? 1 - discount : 1) -
          (discount >= 1 ? Math.abs(discount) : 0),
        0,
      ),
      timeUnit: unitUnitInput,
    }

    return computedPrice
  }, [categoriesPrice, discount, unitUnitInput])

  /* const prevCategoriesPriceRef = useRef(categoriesPrice)

  useEffect(() => {
    if (
      JSON.stringify(prevCategoriesPriceRef.current) !==
      JSON.stringify(categoriesPrice)
    ) {
      prevCategoriesPriceRef.current = categoriesPrice
    }
  }, [categoriesPrice, onChange]) */

  const valueContext = useMemo(
    () => ({
      currency,
      localeFormat,
      items,
      categoriesPrice,
      hideTimeUnit,
      timePeriodUnit,
      timePeriodAmount,
      locales,
      fractionDigits,
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
        value: option,
        label: locales[`order.summary.units.${option}.label` as const],
      }),
    )

    return computedPeriodOptions
  }, [periodOptions, locales])

  useEffect(() => {
    onChange?.(categoriesPrice, totalPrice)
  }, [categoriesPrice, totalPrice, onChange])

  return (
    <OrderSummaryContext.Provider value={valueContext}>
      <Container justifyContent="space-between">
        {header ? (
          <HeaderContainer
            direction="row"
            justifyContent="space-between"
            data-hideDetails={hideDetails}
          >
            <Text as="h3" variant="headingSmallStrong" sentiment="neutral">
              {header}
            </Text>
            {!hideTimeUnit && !hideDetails ? (
              <StyledStack>
                <UnitInput
                  width="100%"
                  selectInputWidth="fit-content"
                  options={computePeriodOptions}
                  onChange={value => {
                    setTimePeriodAmount(value)
                  }}
                  onChangeUnitValue={(val: string) => {
                    setTimePeriodUnit(val as TimeUnit)
                    onChangeUnitInput?.(val)
                  }}
                  value={valueUnitInput}
                  unitValue={unitUnitInput}
                  size="small"
                />
              </StyledStack>
            ) : null}
          </HeaderContainer>
        ) : null}
        {!hideDetails ? <ScrollableContent /> : null}
        <NonScrollableContent
          totalPrice={totalPrice}
          discount={discount}
          footer={footer}
          totalPriceInfo={totalPriceInfo}
          hideDetails={hideDetails}
          unit={unitUnitInput}
        >
          {children}
        </NonScrollableContent>
      </Container>
    </OrderSummaryContext.Provider>
  )
}

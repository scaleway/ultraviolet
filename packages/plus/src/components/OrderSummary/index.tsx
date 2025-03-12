import styled from '@emotion/styled'
import { Stack, Text, UnitInput } from '@ultraviolet/ui'
import { useMemo, useState } from 'react'
import { NonScrollableContent } from './NonScrollableContent'
import { OrderSummaryContext } from './Provider'
import { ScrollableContent } from './ScrollableContent'
import { Units } from './constants'
import { calculateCategoryPrice } from './helpers'
import orderSummaryLocales from './locales/en'
import type { OrderSummaryProps, TimeUnit } from './types'

const Container = styled(Stack)`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  width: 18rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    width: 24.5rem ;
  }
`

const HeaderContainer = styled(Stack)`
  height: ${({ theme }) => theme.sizing[900]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  padding: ${({ theme }) => theme.space[3]};
  padding-bottom: ${({ theme }) => theme.space[2]};
`

const StyledStack = styled(Stack)`
  background-color: ${({ theme }) => theme.colors.neutral.background};
  width: 11rem;
`

export const OrderSummary = ({
  header,
  hideTimeUnit = false,
  periodOptions = Units as TimeUnit[],
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
  onChangeUnitInput,
}: OrderSummaryProps) => {
  const [timePeriodUnit, setTimePeriodUnit] = useState<TimeUnit>(unitUnitInput)
  const [timePeriodAmount, setTimePeriodAmount] = useState(valueUnitInput)

  const categoriesPrice = useMemo(() => {
    const listCategories: Record<
      string,
      { before: [number, number]; after: [number, number] }
    > = {}
    items.forEach(category => {
      const { categoryPrice, discountedPrice } = calculateCategoryPrice(
        category,
        hideTimeUnit,
        timePeriodAmount,
        timePeriodUnit,
      )

      return (listCategories[category.category] = {
        before: categoryPrice,
        after: discountedPrice,
      })
    })

    return listCategories
  }, [hideTimeUnit, items, timePeriodAmount, timePeriodUnit])

  const totalPrice = useMemo(() => {
    const price = Object.values(categoriesPrice).reduce<[number, number]>(
      (acc, categoryPrice) => [
        acc[0] + categoryPrice.after[0],
        acc[1] + categoryPrice.after[1],
      ],
      [0, 0],
    )

    const computedPrice = {
      before: [Math.max(price[0], 0), Math.max(price[1], 0)] as [
        number,
        number,
      ],
      after: [
        Math.max(
          price[0] * (discount < 1 ? 1 - discount : 1) -
            (discount >= 1 ? Math.abs(discount) : 0),
          0,
        ),
        Math.max(
          price[1] * (discount < 1 ? 1 - discount : 1) -
            (discount >= 1 ? Math.abs(discount) : 0),
          0,
        ),
      ] as [number, number],
    }

    return computedPrice
  }, [categoriesPrice, discount])

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
        label:
          locales[
            `order.summary.units.${option}.label` as keyof typeof locales
          ],
      }),
    )

    return computedPeriodOptions
  }, [periodOptions, locales])

  return (
    <OrderSummaryContext.Provider value={valueContext}>
      <Container>
        {header ? (
          <HeaderContainer direction="row" justifyContent="space-between">
            <Text as="h3" variant="headingSmallStrong" sentiment="neutral">
              {header}
            </Text>
            {!hideTimeUnit ? (
              <StyledStack>
                <UnitInput
                  width="100%"
                  selectInputWidth="fit-content"
                  options={computePeriodOptions}
                  onChange={setTimePeriodAmount}
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
        <ScrollableContent />
        <NonScrollableContent
          totalPrice={totalPrice}
          discount={discount}
          footer={footer}
          totalPriceInfo={totalPriceInfo}
        >
          {children}
        </NonScrollableContent>
      </Container>
    </OrderSummaryContext.Provider>
  )
}

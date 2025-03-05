import styled from '@emotion/styled'
import { Stack, Text, UnitInput } from '@ultraviolet/ui'
import { useMemo, useState } from 'react'
import { NonScrollableContent } from './NonScrollableContent'
import { OrderSummaryContext } from './Provider'
import { ScrollableContent } from './ScrollableContent'
import { Units } from './constants'
import { calculatePrice } from './helpers'
import orderSummaryLocales from './locales/en'
import type { OrderSummaryProps, TimeUnit } from './types'

const Container = styled(Stack)`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  width: 27.5rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
`

const HeaderContainer = styled(Stack)`
  height: ${({ theme }) => theme.sizing[900]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  padding: ${({ theme }) => theme.space[3]};
  padding-bottom: ${({ theme }) => theme.space[2]};
`

const StyledStack = styled(Stack)`
background-color: ${({ theme }) => theme.colors.neutral.background};`
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
}: OrderSummaryProps) => {
  const [timePeriodUnit, setTimePeriodUnit] = useState<TimeUnit>(unitUnitInput)
  const [timePeriodAmount, setTimePeriodAmount] = useState(valueUnitInput)

  const categoriesPrice = useMemo(() => {
    const listCategories: Record<string, { before: number; after: number }> = {}
    items.forEach(category => {
      const categoryPrice =
        category.subCategories?.reduce(
          (acc, subCategory) =>
            acc +
            (calculatePrice(
              subCategory.price ?? 0,
              subCategory.amount ?? 1,
              subCategory.amountFree,
              hideTimeUnit ? 'hours' : timePeriodUnit,
              hideTimeUnit ? 1 : timePeriodAmount,
              subCategory.discount,
              subCategory.fixedPrice,
            ) || 0),
          0,
        ) || 0

      const discountedPrice = Math.max(
        category.discount && category.discount < 1
          ? categoryPrice * category.discount
          : categoryPrice - (category.discount ?? 0),
        0,
      )

      return (listCategories[category.category] = {
        before: categoryPrice,
        after: discountedPrice,
      })
    })

    return listCategories
  }, [hideTimeUnit, items, timePeriodAmount, timePeriodUnit])

  const totalPrice = useMemo(() => {
    const price = Object.values(categoriesPrice).reduce(
      (acc, categoryPrice) => acc + categoryPrice.after,
      0,
    )

    return {
      before: Math.max(price, 0),
      after: Math.max(
        price * (discount < 1 ? 1 - discount : 1) -
          (discount >= 1 ? Math.abs(discount) : 0),
        0,
      ),
    }
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
                  width="11rem"
                  selectInputWidth="fit-content"
                  options={computePeriodOptions}
                  onChange={setTimePeriodAmount}
                  onChangeUnitValue={(val: string) =>
                    setTimePeriodUnit(val as TimeUnit)
                  }
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

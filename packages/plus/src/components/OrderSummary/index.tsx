import styled from '@emotion/styled'
import { Stack, Text, UnitInput } from '@ultraviolet/ui'
import { useEffect, useMemo, useState } from 'react'
import { NonScrollableContent } from './NonScrollableContent'
import { OrderSummaryContext } from './Provider'
import { ScrollableContent } from './ScrollableContent'
import { calculatePrice } from './helpers'
import estimateCostLocales from './locales/en'
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

export const OrderSummary = ({
  hideTimeUnit = false,
  periodOptions,
  onChangePeriod,
  onChangePeriodUnit,
  value = 1,
  unit = 'hours',
  items,
  validateButtonOnClick,
  locales = estimateCostLocales,
  currency = 'EUR',
  locale = 'en-US',
  commitment = false,
  onChangeCommitment,
  commitmentOptions,
  overallDiscount,
  footer,
}: OrderSummaryProps) => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [categoriesPrice, setCategoriesPrice] = useState<
    Record<string, number>
  >({})
  const [timePeriodUnit, setTimePeriodUnit] = useState<TimeUnit>(unit)
  const [timePeriodAmount, setTimePeriodAmount] = useState(value)
  const [commitmentChoice, setCommitment] = useState<'false' | number>('false')

  const onChangeCommitmentComputed = (val: number | 'false') => {
    setCommitment(val === 'false' ? val : val)
    onChangeCommitment?.(val.toString())
  }

  useEffect(() => {
    const listCategories: Record<string, number> = {}
    items.forEach(
      category =>
        (listCategories[category.category] = category.subCategories.reduce(
          (acc, subCategory) =>
            acc +
            (calculatePrice(
              subCategory.price ?? 0,
              subCategory.amount ?? 1,
              subCategory.amountFree,
              hideTimeUnit ? 'minutes' : timePeriodUnit,
              hideTimeUnit ? 1 : timePeriodAmount,
              subCategory.discount,
            ) || 0),
          0,
        )),
    )

    setCategoriesPrice(listCategories)
  }, [hideTimeUnit, items, timePeriodAmount, timePeriodUnit])

  useEffect(() => {
    const price = Object.values(categoriesPrice).reduce((a, b) => a + b, 0)

    if (commitment && typeof commitmentChoice === 'number') {
      setTotalPrice(price * commitmentChoice)
    } else setTotalPrice(price * (overallDiscount?.discount ?? 1))
  }, [categoriesPrice, commitment, commitmentChoice, overallDiscount?.discount])

  const valueContext = useMemo(
    () => ({
      currency,
      locale,
      items,
      categoriesPrice,
      hideTimeUnit,
      timePeriodUnit,
      timePeriodAmount,
      locales,
    }),
    [
      currency,
      locale,
      items,
      categoriesPrice,
      hideTimeUnit,
      timePeriodUnit,
      timePeriodAmount,
      locales,
    ],
  )

  const computePeriodOptions = useMemo(() => {
    if (periodOptions) {
      const computedPeriodOptions: { label: string; value: string }[] = []

      periodOptions.forEach(option =>
        computedPeriodOptions.push({
          value: option,
          label:
            locales[
              `estimate.cost.units.${option}.label` as keyof typeof locales
            ],
        }),
      )

      return computedPeriodOptions
    }

    return [{ label: 'hours', value: 'hours' }]
  }, [periodOptions, locales])

  const onChangePeriodComputed = (val: number) => {
    setTimePeriodAmount(val)
    onChangePeriod?.(val)
  }

  const onChangePeriodUnitComputed = (val: string) => {
    if (['seconds', 'minutes', 'hours', 'days', 'months'].includes(val)) {
      setTimePeriodUnit(val as TimeUnit)
      onChangePeriodUnit?.(val)
    }
  }

  return (
    <OrderSummaryContext.Provider value={valueContext}>
      <Container>
        <HeaderContainer direction="row" justifyContent="space-between">
          <Text as="p" variant="headingSmallStrong" sentiment="neutral">
            {locales['estimate.cost.header']}
          </Text>
          {!hideTimeUnit && periodOptions ? (
            <UnitInput
              width="11rem"
              selectInputWidth="fit-content"
              options={computePeriodOptions}
              onChange={onChangePeriodComputed}
              onChangeUnitValue={onChangePeriodUnitComputed}
              value={value}
              unitValue={unit}
              size="small"
            />
          ) : null}
        </HeaderContainer>
        <ScrollableContent />
        <NonScrollableContent
          commitment={commitment}
          commitmentChoice={commitmentChoice}
          totalPrice={totalPrice}
          onChangeCommitment={onChangeCommitmentComputed}
          validateButtonOnClick={validateButtonOnClick}
          commitmentOptions={commitmentOptions}
          overallDiscount={overallDiscount}
          footer={footer}
        />
      </Container>
    </OrderSummaryContext.Provider>
  )
}

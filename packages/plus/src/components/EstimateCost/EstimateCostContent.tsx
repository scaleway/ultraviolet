'use client'

import styled from '@emotion/styled'
import { CalculatorIcon } from '@ultraviolet/icons'
import { Alert, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import {
  Children,
  cloneElement,
  isValidElement,
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useInView } from 'react-intersection-observer'
import { CustomUnitInput } from './Components/CustomUnitInput'
import { Item } from './Components/Item'
import { LineThrough } from './Components/LineThrough'
import {
  BadgeBeta,
  Cell,
  EmptyCell,
  EmptyTable,
  PriceCell,
  PriceCol,
  StyledFeesTable,
  StyledTable,
  TimeCell,
  Title,
  TotalPriceCell,
} from './componentStyle'
import { maximumFractionDigits, maximumFractionDigitsLong } from './constants'
import { useEstimateCost } from './EstimateCostProvider'
import { calculatePrice } from './helper'
import EstimateCostLocales from './locales/en'
import { OverlayComponent } from './OverlayComponent'
import { OverlayContextProvider } from './OverlayContext'
import type {
  BareEstimateProduct,
  EstimateCostProps,
  EstimateProduct,
  Iteration,
  Units,
} from './types'

const FeesText = styled(Text)`
  margin-top: ${({ theme }) => theme.space['3']};
`

const StyledText = styled(Text)<{
  isBeta?: boolean
}>`
  text-align: right;
  ${({ isBeta, theme }) =>
    isBeta ? `margin-left: ${theme.space['2']};` : null}
`

const RightAlignedText = styled(Text)`
  text-align: right;
`

const StyledCalculatorIcon = styled(CalculatorIcon)`
  margin-right: ${({ theme }) => theme.space['1']};
`

const StyledPriceCell = styled(Cell.withComponent('th'))`
  ${({ theme }) => PriceCell(theme)}
  padding: 0;
`

const DEFAULT_UNIT_LIST: Units[] = ['hours', 'days', 'months']

type ExtraProps = {
  isLastElement?: boolean
  productsCallback?: {
    add: (product: EstimateProduct) => void
    remove: (product: BareEstimateProduct) => void
  }
  iteration?: Iteration
  discount?: number
}

const DescriptionComponent = memo(
  ({
    description,
    locales,
  }: {
    description: ReactNode
    locales: Record<keyof typeof EstimateCostLocales, string>
  }) =>
    description === undefined || typeof description === 'string' ? (
      <Text as="span" variant="body">
        {description || locales['estimate.cost.description']}
      </Text>
    ) : (
      description
    ),
)

const TitleComponent = memo(
  ({
    locales,
  }: {
    locales: Required<ComponentProps<typeof EstimateCostContent>['locales']>
  }) => (
    <Title>
      <StyledCalculatorIcon sentiment="primary" size="medium" />
      {locales?.['estimate.cost.label']}
    </Title>
  ),
)

export const EstimateCostContent = ({
  description,
  alert,
  alertTitle,
  alertVariant = 'warning',
  defaultTimeUnit = 'hours',
  timeUnits = DEFAULT_UNIT_LIST,
  hideOverlay = false,
  disableOverlayLeft = false,
  disableOverlayRight = false,
  hideTimeUnit = false,
  hideTotal = false,
  hideHourlyPriceOnTotal = false,
  discount = 0,
  OverlayRight,
  OverlayLeft,
  isBeta = false,
  commitmentFees,
  commitmentFeesContent,
  monthlyFees,
  monthlyFeesLabel,
  monthlyFeesContent,
  overlayUnit = 'hours',
  children = null,
  locales = EstimateCostLocales,
  overlayMargin,
  onTotalPriceChange,
}: EstimateCostProps) => {
  const { formatNumber } = useEstimateCost()
  const [ref, inView] = useInView()
  const [products, setProducts] = useState<EstimateProduct[]>([]) // product is used to store each items with their price and amount
  const [totalPrice, setTotalPrice] = useState({
    hourly: 0,
    maxHourly: 0,
    maxOverlayHourly: 0,
    maxTotal: 0,
    overlayHourly: 0,
    total: 0,
  })
  const [iteration, setIteration] = useState<Iteration>({
    unit: defaultTimeUnit ?? 'hours',
    value: 1,
  })

  const [isLongFractionDigits, setIsLongFractionDigits] = useState(false)
  const providerValue = useMemo(() => ({ isOverlay: false }), [])

  const totalValue = useMemo(
    () =>
      formatNumber(totalPrice.total < 0 ? 0 : totalPrice.total, {
        maximumFractionDigits: isLongFractionDigits
          ? maximumFractionDigitsLong[iteration.unit]
          : maximumFractionDigits[iteration.unit],
      }),
    [formatNumber, isLongFractionDigits, iteration.unit, totalPrice.total],
  )

  const totalMaxValue = useMemo(
    () =>
      formatNumber(totalPrice.maxTotal < 0 ? 0 : totalPrice.maxTotal, {
        maximumFractionDigits: isLongFractionDigits
          ? maximumFractionDigitsLong[iteration.unit]
          : maximumFractionDigits[iteration.unit],
      }),
    [formatNumber, isLongFractionDigits, iteration.unit, totalPrice.maxTotal],
  )

  const productsCallback = useMemo(
    () => ({
      add: (newProduct: EstimateProduct) => {
        setProducts(total => {
          if (total.find(product => product.id === newProduct.id)) {
            return total.map(product =>
              product.id === newProduct.id ? newProduct : product,
            )
          }

          return [...total, newProduct]
        })
      },

      remove: ({ id }: BareEstimateProduct) => {
        setProducts(total => total.filter(product => product.id !== id))
      },
    }),
    [setProducts],
  )

  useEffect(() => {
    // this variable check if there is a maxAmount in each product
    // if not we do not need to calculate maxTotal, maxHourly, maxOverlayHourly
    const isMaxAmountInProducts = products.find(product => product.maxAmount)
    setIsLongFractionDigits(
      !!products.find(product => product.longFractionDigits),
    )
    setTotalPrice({
      hourly: products.reduce(
        (acc, product) =>
          acc +
          (product.noIteration
            ? 0
            : (product.price - product.price * product.discount) *
              Math.max(product.amount - product.amountFree, 0)),
        0,
      ),
      maxHourly: isMaxAmountInProducts
        ? products.reduce(
            (acc, product) =>
              acc && product.noIteration
                ? 0
                : (product.price - product.price * product.discount) *
                  Math.max(product.maxAmount - product.amountFree, 0),

            0,
          )
        : 0,
      maxOverlayHourly: isMaxAmountInProducts
        ? products.reduce(
            (acc, product) =>
              acc +
              (product.noIteration
                ? 0
                : (product.price - product.price * product.discount) *
                  Math.max(product.maxAmount - product.amountFree, 0)),
            0,
          )
        : 0,
      maxTotal: isMaxAmountInProducts
        ? products.reduce(
            (acc, product) =>
              acc +
              calculatePrice({
                amount: product.maxAmount || product.amount, // Not all products have maxAmount, so we need to check both
                amountFree: product.amountFree,
                discount: product.discount,
                price: product.price,
                timeAmount: product.noIteration ? 1 : iteration.value,
                timeUnit: product.noIteration ? 'hours' : iteration.unit,
              }),
            0,
          )
        : 0,
      overlayHourly: products.reduce(
        (acc, product) =>
          acc +
          (product.noIteration
            ? 0
            : (product.price - product.price * product.discount) *
              Math.max(product.amount - product.amountFree, 0)),
        0,
      ),
      total: !hideTotal
        ? products.reduce(
            (acc, product) =>
              acc +
              calculatePrice({
                amount: product.amount,
                amountFree: product.amountFree,
                discount: product.discount,
                price: product.price,
                timeAmount: product.noIteration ? 1 : iteration.value,
                timeUnit: product.noIteration ? 'hours' : iteration.unit,
              }),
            0,
          )
        : 0,
    })
    onTotalPriceChange?.({
      total: totalPrice.total,
      totalMax: totalPrice.maxTotal > 0 ? totalPrice.maxTotal : undefined,
    })
  }, [
    hideTotal,
    products,
    iteration,
    setTotalPrice,
    onTotalPriceChange,
    totalPrice.total,
    totalPrice.maxTotal,
    totalValue,
    totalMaxValue,
  ])

  useEffect(() => {
    if (
      hideTimeUnit &&
      (iteration.value > 1 || iteration.unit !== (defaultTimeUnit ?? 'hours'))
    ) {
      setIteration({ unit: defaultTimeUnit ?? 'hours', value: 1 })
    }
  }, [hideTimeUnit, iteration, defaultTimeUnit])

  return (
    <Stack gap={2}>
      {!hideOverlay ? (
        <OverlayComponent
          disableOverlayLeft={disableOverlayLeft}
          disableOverlayRight={disableOverlayRight}
          discount={discount}
          inView={inView}
          isBeta={isBeta}
          OverlayLeft={OverlayLeft}
          OverlayRight={OverlayRight}
          overlayMargin={overlayMargin}
          totalPrice={totalPrice}
          unit={overlayUnit ?? 'hours'}
        >
          {children}
        </OverlayComponent>
      ) : null}
      {description === false ? null : (
        <DescriptionComponent description={description} locales={locales} />
      )}
      {alert ? (
        <Alert sentiment={alertVariant} title={alertTitle}>
          {alert}
        </Alert>
      ) : null}
      <OverlayContextProvider value={providerValue}>
        <div>
          {children ? (
            <StyledTable
              cellPadding="0"
              cellSpacing="0"
              data-testid="summary"
              noTotal={hideTotal}
              ref={ref}
            >
              <colgroup>
                <col />
                <PriceCol />
              </colgroup>
              {!hideTimeUnit ? (
                <thead>
                  <tr>
                    <th>
                      <TitleComponent locales={locales} />
                    </th>
                    <StyledPriceCell>
                      <TimeCell>
                        <CustomUnitInput
                          defaultTimeUnit={defaultTimeUnit}
                          iteration={iteration}
                          setIteration={setIteration}
                          timeUnits={timeUnits}
                        />
                      </TimeCell>
                    </StyledPriceCell>
                  </tr>
                </thead>
              ) : null}
              <tbody>
                {Children.map(children, (child, index) =>
                  isValidElement<ExtraProps>(child)
                    ? cloneElement(child, {
                        discount:
                          discount &&
                          !(
                            (
                              child as {
                                props: Record<string, unknown>
                              }
                            ).props as {
                              discount?: number
                            }
                          ).discount
                            ? discount
                            : (
                                (
                                  child as {
                                    props: Record<string, unknown>
                                  }
                                ).props as {
                                  discount?: number
                                }
                              ).discount,
                        isLastElement: index === Children.count(children) - 1,
                        iteration,
                        productsCallback,
                      })
                    : child,
                )}
              </tbody>
            </StyledTable>
          ) : null}
          {!hideTotal ? (
            <EmptyTable cellPadding="0" cellSpacing="0">
              <colgroup>
                <col />
                <PriceCol />
              </colgroup>
              <tbody>
                <tr>
                  <EmptyCell aria-label="control" />
                  <TotalPriceCell hasBorder={false}>
                    {isBeta ? (
                      <BadgeBeta
                        long={
                          locales[
                            `estimate.cost.beta.${
                              discount > 0 ? 'discount' : 'free'
                            }`
                          ].length > 25
                        }
                        prominence="strong"
                        sentiment="warning"
                      >
                        {`${discount > 0 ? discount * 100 : ''}
                          ${
                            locales[
                              `estimate.cost.beta.${
                                discount > 0 ? 'discount' : 'free'
                              }`
                            ]
                          }`}
                      </BadgeBeta>
                    ) : null}
                    <StyledText
                      as="h3"
                      isBeta={isBeta}
                      sentiment="primary"
                      variant="heading"
                    >
                      <LineThrough
                        isActive={isBeta && (discount === 0 || discount >= 1)}
                      >
                        {totalValue}
                        {totalPrice.maxTotal > 0 ? ` - ${totalMaxValue}` : null}
                      </LineThrough>
                    </StyledText>
                    {hideHourlyPriceOnTotal &&
                    totalPrice.hourly > 0 &&
                    totalPrice.hourly !== totalPrice.total &&
                    totalPrice.total > 0 ? (
                      <RightAlignedText as="p" variant="body">
                        <LineThrough
                          isActive={isBeta && (discount === 0 || discount >= 1)}
                        >
                          {formatNumber(totalPrice.hourly, {
                            maximumFractionDigits: isLongFractionDigits
                              ? maximumFractionDigitsLong.hours
                              : maximumFractionDigits.hours,
                          })}
                          {totalPrice.maxHourly > 0
                            ? ` - ${formatNumber(totalPrice.maxHourly, {
                                maximumFractionDigits: isLongFractionDigits
                                  ? maximumFractionDigitsLong.hours
                                  : maximumFractionDigits.hours,
                              })}`
                            : null}
                          /
                          {locales[
                            `estimate.cost.units.hours.label`
                          ].toLowerCase()}
                        </LineThrough>
                      </RightAlignedText>
                    ) : null}
                  </TotalPriceCell>
                </tr>
              </tbody>
            </EmptyTable>
          ) : null}
          {commitmentFees !== undefined || monthlyFees !== undefined ? (
            <>
              <FeesText as="h3" variant="headingSmall">
                {
                  locales[
                    `estimate.cost.fees.${
                      commitmentFees ? 'oneTime' : 'monthly'
                    }.title`
                  ]
                }
              </FeesText>
              <StyledFeesTable>
                <tbody>
                  <Item
                    isLastElement
                    label={
                      commitmentFees
                        ? locales['estimate.cost.fees.commitment']
                        : monthlyFeesLabel
                    }
                    noIteration
                    price={commitmentFees || monthlyFees}
                    productsCallback={{
                      add: () => {},
                      remove: () => {},
                    }}
                  >
                    {commitmentFees
                      ? commitmentFeesContent
                      : monthlyFeesContent}
                  </Item>
                </tbody>
              </StyledFeesTable>
            </>
          ) : null}
        </div>
      </OverlayContextProvider>
    </Stack>
  )
}

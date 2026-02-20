// oxlint-disable eslint/complexity

'use client'

import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Alert } from '../../Alert'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { CompactEstimateCost } from './CompactEstimateCost'
import {
  ChildrenComponent,
  DescriptionComponent,
  TotalComponent,
} from './Components/ContentComponents'
import { Item } from './Components/Item'
import { maximumFractionDigits, maximumFractionDigitsLong } from './constants'
import { useEstimateCost } from './EstimateCostProvider'
import { calculatePrice } from './helper'
import EstimateCostLocales from './locales/en'
import { OverlayComponent } from './OverlayComponent'
import { OverlayContextProvider } from './OverlayContext'
import {
  estimateCostContent,
  estimateCostFeesTable,
  estimatecostFeesText,
} from './styles.css'
import type {
  BareEstimateProduct,
  EstimateCostProps,
  EstimateProduct,
  Iteration,
  Units,
} from './types'

const DEFAULT_UNIT_LIST: Units[] = ['hours', 'days', 'months']

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
  style,
  compact,
}: EstimateCostProps) => {
  const [ref, inView] = useInView()
  const { formatNumber } = useEstimateCost()

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
      total: hideTotal
        ? 0
        : products.reduce(
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
          ),
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
    <>
      {compact ? (
        <CompactEstimateCost
          iteration={iteration}
          label={locales['estimate.cost.label']}
          totalPrice={totalPrice}
        />
      ) : null}
      <Stack
        className={estimateCostContent[compact ? 'compact' : 'default']}
        gap={2}
        style={style}
      >
        {hideOverlay ? null : (
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
            unit={overlayUnit}
          >
            {children}
          </OverlayComponent>
        )}
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
              <ChildrenComponent
                defaultTimeUnit={defaultTimeUnit}
                discount={discount}
                hideTimeUnit={hideTimeUnit}
                hideTotal={hideTotal}
                iteration={iteration}
                productsCallback={productsCallback}
                ref={ref}
                setIteration={setIteration}
                timeUnits={timeUnits}
              >
                {children}
              </ChildrenComponent>
            ) : null}
            {hideTotal ? null : (
              <TotalComponent
                discount={discount}
                hideHourlyPriceOnTotal={hideHourlyPriceOnTotal}
                isBeta={isBeta}
                isLongFractionDigits={isLongFractionDigits}
                totalMaxValue={totalMaxValue}
                totalPrice={totalPrice}
                totalValue={totalValue}
              />
            )}
            {commitmentFees !== undefined || monthlyFees !== undefined ? (
              <>
                <Text
                  as="h3"
                  className={estimatecostFeesText}
                  variant="headingSmall"
                >
                  {
                    locales[
                      `estimate.cost.fees.${
                        commitmentFees ? 'oneTime' : 'monthly'
                      }.title`
                    ]
                  }
                </Text>
                <table className={estimateCostFeesTable}>
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
                </table>
              </>
            ) : null}
          </div>
        </OverlayContextProvider>
      </Stack>
    </>
  )
}

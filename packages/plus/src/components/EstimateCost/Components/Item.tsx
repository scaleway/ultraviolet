'use client'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { HelpCircleOutlineIcon } from '@ultraviolet/icons'
import { Badge, Stack, Text, Tooltip, zoomIn } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import {
  Children,
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react'
import {
  OverlayRow,
  PriceCell,
  Cell as StyledCell,
  StyledDiv,
  StyledLeftSide,
  StyledTr,
} from '../componentStyle'
import {
  MAX_CELL_WIDTH,
  maximumFractionDigits,
  maximumFractionDigitsLong,
  multiplier,
} from '../constants'
import { useEstimateCost } from '../EstimateCostProvider'
import { calculatePrice } from '../helper'
import { useOverlay } from '../OverlayContext'
import type {
  BareEstimateProduct,
  EstimateProduct,
  Iteration,
  Units,
} from '../types'

const TIME_RELATED_UNIT: Units[] = [
  'seconds',
  'minutes',
  'hours',
  'days',
  'months',
]

const StyledResourceName = styled('div', {
  shouldForwardProp: prop => !['isOverlay', 'animated'].includes(prop),
})<{
  isOverlay: boolean
  animated: boolean
}>`
  text-align: ${({ isOverlay }) => (isOverlay ? 'initial' : 'right')};

  ${({ isOverlay, animated }) =>
    isOverlay
      ? css`
          height: 48px;
          display: flex;
          flex-direction: column;
          -webkit-box-pack: center;
          justify-content: center;
          animation: ${animated ? css`800ms ${zoomIn}` : ''};
        `
      : null}
`

const StyledBadge = styled(Badge)`
  margin-left: ${({ theme }) => theme.space['1']};
  align-self: center;
`

const StyledText = styled(Text)`
  margin-left: ${({ theme }) => theme.space['1']};
`

const MaxWidthText = styled(Text)`
  max-width: 75%;
`

const TextAlignRight = styled(Text)`
  text-align: right;
`

const StyledTooltip = styled(Tooltip)`
  vertical-align: text-top;
`

const StyledPriceCell = styled(StyledCell)`
  ${({ theme }) => PriceCell(theme)}
`

type ExtraProps = {
  itemCallback: (amount: number, isVariant: boolean) => void
  amount: number
  maxAmount: number
  unit: string
}

type ItemProps = {
  amount?: number
  /**
   * Number of items that are free. It will be deducted to price of the item.
   */
  amountFree?: number
  /**
   * if true, zoomIn animation is triggered
   */
  animated?: boolean
  children?: ReactNode
  discount?: number
  discountText?: string
  /**
   * Hide element from overlay
   */
  hideFromOverlay?: boolean
  /**
   * Do not set this prop, it is transferred from parent
   */
  isDefined?: boolean
  /**
   * Do not set this prop, it is transferred from parent
   */
  isFirstElement?: boolean
  /**
   * Do not set this prop, it is transferred from parent
   */
  isLastElement?: boolean
  isPrimaryBackground?: boolean
  /**
   * Do not set this prop, it is transferred from parent
   */
  iteration?: Iteration
  /**
   * String that is displayed on left part of the item, it defines the item
   */
  label?: ReactNode
  /**
   * Changes label typography variant
   */
  labelTextVariant?: ComponentProps<typeof Text>['variant']
  /**
   * Changes label typography prominence
   */
  labelTextProminence?: ComponentProps<typeof Text>['prominence']
  /**
   * If your price has a lot of number after decimal point (ex: 0.0000076) - up 8 fraction digits
   */
  longFractionDigits?: boolean
  /**
   * Create a range price with [amount - maxAmount] values and prices
   */
  maxAmount?: number
  /**
   * Price per month
   */
  monthlyPrice?: number
  /**
   * Remove border bottom of the item
   */
  noBorder?: boolean
  /**
   * If the price of the item is not based on time enable this prop. ex: 5kg of chocolate is same price over 1 month or 1 hour.
   */
  noIteration?: boolean
  noIterationText?: string
  /**
   * Remove the price on the right section of the table
   */
  noPrice?: boolean
  /**
   * Notice to display below the label
   */
  notice?: string
  onAmountChange?: (amount: number) => void
  /**
   * Hourly price for one unit
   */
  price?: number
  priceText?: ReactNode
  productsCallback?: {
    add: (product: EstimateProduct) => void
    remove: (product: BareEstimateProduct) => void
  }
  /**
   * Hide item from overlay if screen width is small
   */
  shouldBeHidden?: boolean
  /**
   * Display a complementary text on the right of the label
   */
  subLabel?: string
  /**
   * Increase left padding of the item like
   */
  tabulation?: number
  /**
   * Text to display in case of not defined value
   */
  textNotDefined?: string
  /**
   * Display near label, an icon with a tooltip that contains your text
   */
  tooltipInfo?: string
  /**
   * Unit of your item, examples: GB, MB, Node, Queries, etc.
   */
  unit?:
    | 'mb'
    | 'gb'
    | 'tb'
    | 'seconds'
    | 'minutes'
    | 'hours'
    | 'days'
    | 'months'
    | 'years'
    // Allow a string for unit but keep autocomplete for the above values
    | (string & NonNullable<unknown>)
  /*
   * To strike through the price
   */
  strikeThrough?: boolean
}

const StyleNoPriceItem = styled(Text)`
  text-align: right;
`

export const Item = memo(
  ({
    discount = 0,
    priceText,
    discountText,
    label,
    tooltipInfo, // Shows an icon with tooltip that contains this text
    subLabel = '', // Usually used for showing amount that is free
    price: basePrice = 0, // Hourly price for one unit
    monthlyPrice = 0, // Price per month
    unit: baseUnit, // Can be GB, MB, Node, Queries, etc.
    amount: currentAmount = 1, // Current number of items
    onAmountChange,
    amountFree = 0, // Amount that is free - offered by company
    maxAmount = 0, // Max amount - used for kubernetes for example
    longFractionDigits = false, // In case price is really long 0.0000076 - up 7 fraction digits
    noIteration = false, // if item is not based on time (ex: download, upload, transfer)
    noIterationText,
    noBorder, // remove the border bottom of the item
    noPrice, // remove the price on right side of the table
    isDefined = true,
    children = null,
    isFirstElement = false,
    isLastElement = false,
    isPrimaryBackground = false,
    productsCallback,
    iteration: receivedIteration, // Object from parent that contains time period (hours, days, months)
    shouldBeHidden = false, // Hide element from overlay if screen width is small
    hideFromOverlay = false, // Hide element from overlay in any case
    textNotDefined, // Text to display in case of not defined value
    animated = false, // if true, zoomIn animation is triggered
    tabulation, // Increase left padding of the item
    labelTextVariant, // To change left cell typography variant
    labelTextProminence, // To change left cell typography prominence
    notice, // To display a gray text below the label
    strikeThrough, // To strike through the price
  }: ItemProps) => {
    const { locales, formatNumber } = useEstimateCost()

    let iteration: Iteration | undefined

    if (noIteration) {
      iteration = {
        ...(receivedIteration ?? { value: 0 }),
        unit: 'hours',
      }
    } else {
      iteration = receivedIteration
    }

    const price = useMemo(() => {
      if (monthlyPrice && basePrice === 0) {
        return monthlyPrice / multiplier.months
      }

      return basePrice
    }, [basePrice, monthlyPrice])

    const unit = useMemo(() => {
      if (!baseUnit) {
        return locales['estimate.cost.units.gb.label']
      }

      return baseUnit
    }, [baseUnit, locales])

    const { isOverlay } = useOverlay()
    const Row = isOverlay ? OverlayRow : StyledTr
    const Cell = isOverlay ? StyledCell.withComponent('div') : StyledCell
    const LeftSide = isOverlay ? 'div' : StyledLeftSide

    const [amount, setAmount] = useState(currentAmount)
    const [isVariant, setIsVariant] = useState(false)

    useEffect(() => setAmount(currentAmount), [setAmount, currentAmount])
    useEffect(() => onAmountChange?.(amount), [onAmountChange, amount])

    const itemCallback = useCallback(
      (localAmount: number, localIsVariant: boolean) => {
        setAmount(localAmount)
        setIsVariant(localIsVariant)
      },
      [setAmount, setIsVariant],
    )

    const id = useId()

    // We remove Item from object list when Iem component unmount to avoid duplicates
    useEffect(
      () => () => productsCallback?.remove({ id }),
      [id, productsCallback],
    )

    useEffect(() => {
      if (!isOverlay) {
        productsCallback?.add({
          amount,
          amountFree,
          discount,
          id,
          isVariant,
          longFractionDigits,
          maxAmount,
          noIteration,
          price,
        })
      }
    }, [
      price,
      discount,
      amount,
      id,
      productsCallback,
      maxAmount,
      noIteration,
      isVariant,
      amountFree,
      isOverlay,
      longFractionDigits,
    ])

    const computedItemPrice = useMemo(
      () =>
        calculatePrice({
          amount,
          amountFree,
          discount,
          price,
          timeAmount: noIteration ? 1 : (iteration?.value ?? 1),
          timeUnit: noIteration ? 'hours' : (iteration?.unit ?? 'hours'),
        }),
      [price, amount, amountFree, iteration, noIteration, discount],
    )

    const computedMaxItemPrice = useMemo(
      () =>
        calculatePrice({
          amount: maxAmount,
          amountFree,
          discount,
          price,
          timeAmount: noIteration ? 1 : (iteration?.value ?? 1),
          timeUnit: noIteration ? 'hours' : (iteration?.unit ?? 'hours'),
        }),
      [price, maxAmount, amountFree, iteration, noIteration, discount],
    )

    const formatMaximumFractionDigits = useMemo(() => {
      if (!iteration?.unit) {
        return undefined
      }

      return longFractionDigits
        ? maximumFractionDigitsLong[iteration?.unit]
        : maximumFractionDigits[iteration?.unit]
    }, [iteration?.unit, longFractionDigits])

    return (
      <Row
        hideFromOverlay={hideFromOverlay}
        isFirstElement={isFirstElement}
        shouldBeHidden={shouldBeHidden}
      >
        <Cell
          hasBorder={!isLastElement && !noBorder && !isOverlay}
          tabulation={tabulation}
          width={!isOverlay ? MAX_CELL_WIDTH : 'inherit'}
        >
          <LeftSide>
            <Stack>
              <Stack direction="row">
                <Text
                  as="p"
                  prominence={labelTextProminence ?? 'default'}
                  variant={labelTextVariant ?? 'body'}
                >
                  {label}
                </Text>
                {tooltipInfo ? (
                  <StyledDiv>
                    <StyledTooltip text={tooltipInfo}>
                      <HelpCircleOutlineIcon size="medium" />
                    </StyledTooltip>
                  </StyledDiv>
                ) : null}
                {subLabel && !isOverlay ? (
                  <StyledText as="p" italic sentiment="primary" variant="body">
                    {subLabel}
                  </StyledText>
                ) : null}
                {discount > 0 && discountText ? (
                  <StyledBadge
                    prominence="strong"
                    sentiment="warning"
                    size="small"
                  >
                    {discountText}
                  </StyledBadge>
                ) : null}
              </Stack>
              {notice ? (
                <MaxWidthText as="p" prominence="weak" variant="caption">
                  {notice}
                </MaxWidthText>
              ) : null}
            </Stack>
            <StyledResourceName animated={animated} isOverlay={isOverlay}>
              {isDefined
                ? Children.map(children, child =>
                    isValidElement<ExtraProps>(child)
                      ? cloneElement(child, {
                          amount,
                          itemCallback,
                          maxAmount,
                          unit,
                        })
                      : null,
                  )
                : textNotDefined || locales['estimate.cost.notDefined']}
            </StyledResourceName>
          </LeftSide>
        </Cell>
        {!isOverlay ? (
          <StyledPriceCell
            hasBorder={!isLastElement && !noBorder}
            primary={isPrimaryBackground}
          >
            {!noPrice ? (
              <>
                <StyleNoPriceItem
                  as="p"
                  prominence={
                    computedItemPrice === 0 && computedMaxItemPrice === 0
                      ? 'weak'
                      : 'default'
                  }
                  sentiment={
                    computedItemPrice === 0 && computedMaxItemPrice === 0
                      ? 'neutral'
                      : 'primary'
                  }
                  strikeThrough={strikeThrough}
                  variant={noIterationText ? 'headingSmall' : 'bodyStrong'}
                >
                  {priceText}
                  {!priceText
                    ? formatNumber(computedItemPrice, {
                        maximumFractionDigits: formatMaximumFractionDigits,
                      })
                    : null}
                  {noIterationText ? (
                    <Text as="span" sentiment="primary" variant="bodySmall">
                      /{noIterationText}
                    </Text>
                  ) : null}
                  {!priceText && computedMaxItemPrice > 0
                    ? ` - ${formatNumber(computedMaxItemPrice, {
                        maximumFractionDigits: formatMaximumFractionDigits,
                      })}`
                    : null}
                </StyleNoPriceItem>
                {(amount - amountFree !== 1 && computedItemPrice > 0) ||
                (maxAmount > 0 && computedMaxItemPrice > 0) ? (
                  <TextAlignRight as="p" variant="body">
                    {formatNumber(
                      calculatePrice({
                        amount: 1,
                        discount,
                        price,
                        timeAmount: 1,
                        timeUnit: 'hours',
                      }),
                      {
                        maximumFractionDigits: longFractionDigits
                          ? maximumFractionDigitsLong.hours
                          : maximumFractionDigits.hours,
                      },
                    )}
                    {TIME_RELATED_UNIT.includes(unit as Units)
                      ? locales[
                          `estimate.cost.units.${unit as Units}.label`
                        ].toLowerCase()
                      : `/${unit}`}
                    {!noIteration
                      ? `/${locales[
                          'estimate.cost.units.hours.label'
                        ].toLowerCase()}`
                      : null}
                  </TextAlignRight>
                ) : null}
              </>
            ) : null}
          </StyledPriceCell>
        ) : null}
      </Row>
    )
  },
)

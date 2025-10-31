'use client'

import { CalculatorIcon } from '@ultraviolet/icons'
import { Badge, Stack } from '@ultraviolet/ui'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { JSX, ReactNode } from 'react'
import { Children, cloneElement, isValidElement, useMemo } from 'react'
import { estimateCostResourceName } from './Components/components.css'
import { LineThrough } from './Components/LineThrough'
import { Strong } from './Components/Strong'
import { maximumFractionDigits, multiplier } from './constants'
import { useEstimateCost } from './EstimateCostProvider'
import { OverlayContextProvider } from './OverlayContext'
import {
  estimateCostBadge,
  estimateCostList,
  estimateCostOverlayContainer,
  estimateCostOverlayRow,
  estimateCostSideItem,
  overlayMarginVar,
} from './styles.css'
import type { Units } from './types'

type ExtraProps = {
  isFirstElement?: boolean
  isLastElement?: boolean
}

type OverlayComponentProps = {
  children: ReactNode
  disableOverlayLeft?: boolean
  disableOverlayRight?: boolean
  discount?: number
  inView?: boolean
  isBeta?: boolean
  unit: Units
  OverlayLeft?: (props: {
    children: ReactNode
    disabled?: boolean
  }) => JSX.Element
  OverlayRight?: (props: {
    children?: ReactNode
    disabled?: boolean
  }) => JSX.Element
  totalPrice: {
    maxOverlayHourly: number
    overlayHourly: number
  }
  overlayMargin?: string
}

export const OverlayComponent = ({
  children,
  inView = false,
  discount = 1,
  OverlayRight,
  disableOverlayRight = false,
  OverlayLeft,
  disableOverlayLeft = false,
  totalPrice,
  unit = 'hours',
  isBeta = false,
  overlayMargin,
}: OverlayComponentProps) => {
  const { locales, formatNumber } = useEstimateCost()

  const value = useMemo(() => ({ isOverlay: true }), [])

  const totalOverlayPrice = {
    days: totalPrice.maxOverlayHourly * multiplier.days,
    hours: totalPrice.maxOverlayHourly,
    minutes: totalPrice.maxOverlayHourly * multiplier.minutes,
    months: totalPrice.maxOverlayHourly * multiplier.months,
    seconds: totalPrice.maxOverlayHourly * multiplier.seconds,
  }[unit]

  const overlayPrice = {
    days: totalPrice.overlayHourly * multiplier.days,
    hours: totalPrice.overlayHourly,
    minutes: totalPrice.overlayHourly * multiplier.minutes,
    months: totalPrice.overlayHourly * multiplier.months,
    seconds: totalPrice.overlayHourly * multiplier.seconds,
  }[unit]

  return (
    <OverlayContextProvider value={value}>
      <div
        className={estimateCostOverlayContainer({ inView })}
        data-testid="summary-overlay"
        style={assignInlineVars({
          [overlayMarginVar]: overlayMargin ?? '0',
        })}
      >
        <ul className={estimateCostList}>
          {OverlayLeft ? (
            <li className={estimateCostSideItem}>
              <OverlayLeft disabled={disableOverlayLeft}>
                {locales['estimate.cost.submit.label']}
              </OverlayLeft>
            </li>
          ) : null}
          {Children.map(children, (child, index) =>
            isValidElement<ExtraProps>(child)
              ? cloneElement(child, {
                  isFirstElement: index === 0,
                  isLastElement: index === Children.count(children) - 1,
                })
              : null,
          )}
          <li className={estimateCostOverlayRow()}>
            <Stack alignItems="center" direction="row" gap={1}>
              <CalculatorIcon sentiment="primary" size="medium" />
              {locales['estimate.cost.label']}
            </Stack>
            <div className={estimateCostResourceName()}>
              <Strong variant="big">
                <LineThrough isActive={isBeta && discount === 0}>
                  {formatNumber(overlayPrice, {
                    maximumFractionDigits: maximumFractionDigits[unit],
                  })}
                  {totalOverlayPrice > 0
                    ? ` - ${formatNumber(totalOverlayPrice, {
                        maximumFractionDigits: maximumFractionDigits[unit],
                      })}`
                    : null}
                  /{locales[`estimate.cost.units.${unit}.label`]}
                </LineThrough>
              </Strong>
              {isBeta ? (
                <Badge
                  className={estimateCostBadge}
                  prominence="strong"
                  sentiment="warning"
                >
                  {discount > 0 ? discount * 100 : ''}
                  {
                    locales[
                      `estimate.cost.beta.${discount > 0 ? 'discount' : 'free'}`
                    ]
                  }
                </Badge>
              ) : null}
            </div>
          </li>
          {OverlayRight ? (
            <li className={estimateCostSideItem}>
              <OverlayRight disabled={disableOverlayRight}>
                {locales['estimate.cost.submit.label']}
              </OverlayRight>
            </li>
          ) : null}
        </ul>
      </div>
    </OverlayContextProvider>
  )
}

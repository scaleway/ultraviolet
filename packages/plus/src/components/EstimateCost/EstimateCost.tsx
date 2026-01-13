'use client'

import { Text } from '@ultraviolet/ui'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ComponentProps, ReactNode } from 'react'
import { Children } from 'react'
import { maxWidthText, maxWidthTextVar } from './Components/components.css'
import { Item } from './Components/Item'
import { LineThrough } from './Components/LineThrough'
import { NumberInput } from './Components/NumberInput'
import { Region } from './Components/Region'
import { Regular } from './Components/Regular'
import { Strong } from './Components/Strong'
import { Unit } from './Components/Unit'
import { Zone } from './Components/Zone'
import { EstimateCostContent } from './EstimateCostContent'
import { EstimateCostProvider } from './EstimateCostProvider'
import EstimateCostLocales from './locales/en'
import { useOverlay } from './OverlayContext'
import { estimateCostImage } from './styles.css'
import type { EstimateCostProps, Units } from './types'

const DEFAULT_UNIT_LIST: Units[] = ['hours', 'days', 'months']

const Image = (props: ComponentProps<'img'>) => (
  <img
    // Explicit alt otherwise there is an oxc error
    alt={props.alt}
    {...props}
    className={cn(props.className, estimateCostImage)}
  />
)

const EstimateCost = ({
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
  discount = 0,
  OverlayRight,
  OverlayLeft,
  overlayMargin,
  isBeta = false,
  commitmentFees,
  commitmentFeesContent,
  monthlyFees,
  monthlyFeesLabel,
  monthlyFeesContent,
  overlayUnit = 'hours',
  children = null,
  locales = EstimateCostLocales,
  compact,
  numberLocales = 'en-EN',
  currency = 'EUR',
  style,
  onTotalPriceChange,
}: EstimateCostProps) => (
  <EstimateCostProvider
    currency={currency}
    locales={locales}
    numberLocales={numberLocales}
  >
    <EstimateCostContent
      alert={alert}
      alertTitle={alertTitle}
      alertVariant={alertVariant}
      commitmentFees={commitmentFees}
      commitmentFeesContent={commitmentFeesContent}
      compact={compact}
      defaultTimeUnit={defaultTimeUnit}
      description={description}
      disableOverlayLeft={disableOverlayLeft}
      disableOverlayRight={disableOverlayRight}
      discount={discount}
      hideOverlay={hideOverlay}
      hideTimeUnit={hideTimeUnit}
      hideTotal={hideTotal}
      isBeta={isBeta}
      locales={locales}
      monthlyFees={monthlyFees}
      monthlyFeesContent={monthlyFeesContent}
      monthlyFeesLabel={monthlyFeesLabel}
      OverlayLeft={OverlayLeft}
      OverlayRight={OverlayRight}
      onTotalPriceChange={onTotalPriceChange}
      overlayMargin={overlayMargin}
      overlayUnit={overlayUnit}
      style={style}
      timeUnits={timeUnits}
    >
      {children}
    </EstimateCostContent>
  </EstimateCostProvider>
)

EstimateCost.LineThrough = LineThrough

EstimateCost.Item = Item

EstimateCost.NumberInput = NumberInput

EstimateCost.Unit = Unit

EstimateCost.Strong = Strong

EstimateCost.Regular = Regular

EstimateCost.Image = Image

EstimateCost.Region = Region
EstimateCost.Zone = Zone

const Ellipsis = ({
  children,
  maxWidth = 350,
  'data-testid': dataTestId,
}: {
  children: ReactNode
  maxWidth?: number
  'data-testid'?: string
}) => {
  const { isOverlay } = useOverlay()
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const text = Children.toArray(children).join('').toString()

  return (
    <div
      data-testid={dataTestId}
      style={{ display: isOverlay ? undefined : 'inline-flex' }}
    >
      <Text
        as="p"
        className={maxWidthText}
        oneLine
        style={assignInlineVars({
          [maxWidthTextVar]: isOverlay ? '200px' : `${maxWidth}px`,
        })}
        variant="bodyStrong"
      >
        {text}
      </Text>
    </div>
  )
}

EstimateCost.Ellipsis = Ellipsis

export { EstimateCost }

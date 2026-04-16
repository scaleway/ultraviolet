'use client'

import { Item } from './Components/Item'
import { LineThrough } from './Components/LineThrough'
import { NumberInput } from './Components/NumberInput'
import { Region } from './Components/Region'
import { Regular } from './Components/Regular'
import { Strong } from './Components/Strong'
import { Unit } from './Components/Unit'
import { Zone } from './Components/Zone'
import { Ellipsis } from './Ellipsis'
import { EstimateCostContent } from './EstimateCostContent'
import { EstimateCostProvider } from './EstimateCostProvider'
import { Image } from './Image'
import estimateCostDefaultLocales from './locales/en'

import type { EstimateCostProps, Units } from './types'

const DEFAULT_UNIT_LIST: Units[] = ['hours', 'days', 'months']

export const EstimateCost = ({
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
  locales = estimateCostDefaultLocales,
  compact,
  numberLocales = 'en-EN',
  currency = 'EUR',
  style,
  onTotalPriceChange,
  backgroundProminence = 'default',
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
      backgroundProminence={backgroundProminence}
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

EstimateCost.Ellipsis = Ellipsis

// oxlint-disable-next-line eslint-plugin-react-refresh/only-export-components
export { estimateCostDefaultLocales }

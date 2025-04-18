'use client'

import styled from '@emotion/styled'
import { Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { Children } from 'react'
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
import { useOverlay } from './OverlayContext'
import EstimateCostLocales from './locales/en'
import type { EstimateCostProps, Units } from './types'

const MaxWidthText = styled(Text)<{ maxWidth?: number }>`
  max-width: ${({ maxWidth }) => maxWidth}px;
`

const DEFAULT_UNIT_LIST: Units[] = ['hours', 'days', 'months']

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
  numberLocales = 'en-EN',
  currency = 'EUR',
  onTotalPriceChange,
}: EstimateCostProps) => (
  <EstimateCostProvider
    locales={locales}
    currency={currency}
    numberLocales={numberLocales}
  >
    <EstimateCostContent
      description={description}
      alert={alert}
      alertTitle={alertTitle}
      alertVariant={alertVariant}
      defaultTimeUnit={defaultTimeUnit}
      timeUnits={timeUnits}
      hideOverlay={hideOverlay}
      disableOverlayLeft={disableOverlayLeft}
      disableOverlayRight={disableOverlayRight}
      hideTimeUnit={hideTimeUnit}
      hideTotal={hideTotal}
      discount={discount}
      OverlayRight={OverlayRight}
      OverlayLeft={OverlayLeft}
      isBeta={isBeta}
      commitmentFees={commitmentFees}
      commitmentFeesContent={commitmentFeesContent}
      monthlyFees={monthlyFees}
      monthlyFeesLabel={monthlyFeesLabel}
      monthlyFeesContent={monthlyFeesContent}
      overlayUnit={overlayUnit}
      locales={locales}
      overlayMargin={overlayMargin}
      onTotalPriceChange={onTotalPriceChange}
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

EstimateCost.Image = styled.img`
  width: 15px;
  margin-right: ${({ theme }) => theme.space['1']};
`

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
      style={{ display: !isOverlay ? 'inline-flex' : undefined }}
      data-testid={dataTestId}
    >
      <MaxWidthText
        as="p"
        oneLine
        variant="bodyStrong"
        maxWidth={isOverlay ? 200 : maxWidth}
      >
        {text}
      </MaxWidthText>
    </div>
  )
}

EstimateCost.Ellipsis = Ellipsis

export { EstimateCost }

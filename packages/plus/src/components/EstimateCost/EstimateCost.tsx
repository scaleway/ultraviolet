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
import EstimateCostLocales from './locales/en'
import { useOverlay } from './OverlayContext'
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
      data-testid={dataTestId}
      style={{ display: !isOverlay ? 'inline-flex' : undefined }}
    >
      <MaxWidthText
        as="p"
        maxWidth={isOverlay ? 200 : maxWidth}
        oneLine
        variant="bodyStrong"
      >
        {text}
      </MaxWidthText>
    </div>
  )
}

EstimateCost.Ellipsis = Ellipsis

export { EstimateCost }

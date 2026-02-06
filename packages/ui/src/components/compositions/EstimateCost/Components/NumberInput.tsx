'use client'

import { useEffect, useState } from 'react'
import { NumberInput as NumberInputUV } from '../../../NumberInput'
import { useOverlay } from '../OverlayContext'
import { estimateCostItemResourceName } from './components.css'
import { Regular } from './Regular'

type NumberInputProps = {
  amount?: number
  itemCallback?: (amount?: number | null, isVariant?: boolean) => void
  getAmountValue?: (amount?: number | null) => void
  minValue?: number
  maxValue?: number
  controls?: boolean
}

export const NumberInput = ({
  amount,
  minValue = 0,
  maxValue = 100,
  getAmountValue,
  itemCallback,
  controls = true,
}: NumberInputProps) => {
  const { isOverlay } = useOverlay()
  const [value, setValue] = useState<number | undefined | null>(amount)

  useEffect(() => {
    getAmountValue?.(amount)
  }, [getAmountValue, amount])

  return isOverlay ? (
    <div className={estimateCostItemResourceName()}>
      <Regular>{amount}</Regular>
    </div>
  ) : (
    <NumberInputUV
      controls={controls}
      max={maxValue}
      min={minValue}
      onChange={newValue => {
        setValue(newValue)
        itemCallback?.(newValue, true)
        getAmountValue?.(newValue)
      }}
      size="small"
      value={value}
    />
  )
}

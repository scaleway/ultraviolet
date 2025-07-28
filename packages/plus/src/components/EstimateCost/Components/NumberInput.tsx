'use client'

import { NumberInput as NumberInputUV } from '@ultraviolet/ui'
import { useEffect, useState } from 'react'
import { ItemResourceName } from '../componentStyle'
import { useOverlay } from '../OverlayContext'
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
    <ItemResourceName animated={false}>
      <Regular>{amount}</Regular>
    </ItemResourceName>
  ) : (
    <NumberInputUV
      min={minValue}
      max={maxValue}
      size="small"
      onChange={newValue => {
        setValue(newValue)
        itemCallback?.(newValue, true)
        getAmountValue?.(newValue)
      }}
      value={value}
      controls={controls}
    />
  )
}

'use client'

import { NumberInput } from '@ultraviolet/ui'
import { useEffect, useState } from 'react'
import { useOverlay } from '../OverlayContext'
import {
  estimateCostItemResourceName,
  estimateCostNumberInput,
} from './components.css'
import { Regular } from './Regular'

type UnitProps = {
  amount?: number
  itemCallback?: (amount?: number, isVariant?: boolean) => void
  getAmountValue?: (amount?: number) => void
  unit?: string
}

export const Unit = ({
  amount,
  itemCallback,
  getAmountValue,
  unit,
}: UnitProps) => {
  const { isOverlay } = useOverlay()
  const [capacity, setCapacity] = useState(amount === 0 ? undefined : amount)

  useEffect(() => {
    setCapacity(amount)
    itemCallback?.(amount, true)
    getAmountValue?.(amount)
  }, [getAmountValue, itemCallback, capacity, amount])

  return isOverlay ? (
    <div className={estimateCostItemResourceName()}>
      <Regular>{capacity}</Regular>
    </div>
  ) : (
    <div style={{ width: '150px' }}>
      <NumberInput
        className={estimateCostNumberInput}
        controls={false}
        name="capacity"
        onChange={capacityText => {
          const newCapacity =
            Number(capacityText) < 0 ? 0 : Number(capacityText)
          setCapacity(newCapacity)
          itemCallback?.(newCapacity, true)
          getAmountValue?.(capacity)
        }}
        placeholder="00"
        size="small"
        unit={unit}
        value={capacity}
      />
    </div>
  )
}

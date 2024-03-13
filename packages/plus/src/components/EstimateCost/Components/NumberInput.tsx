import { NumberInputV2 } from '@ultraviolet/ui'
import { useEffect, useState } from 'react'
import { useOverlay } from '../OverlayContext'
import { ItemResourceName } from '../componentStyle'
import { Regular } from './Regular'

type NumberInputProps = {
  amount?: number
  itemCallback?: (amount?: number, isVariant?: boolean) => void
  getAmountValue?: (amount?: number) => void
  minValue?: number
  maxValue?: number
}

export const NumberInput = ({
  amount,
  minValue = 0,
  maxValue = 100,
  getAmountValue,
  itemCallback,
}: NumberInputProps) => {
  const { isOverlay } = useOverlay()
  const [value, setValue] = useState<number | undefined>(amount)

  useEffect(() => {
    getAmountValue?.(amount)
  }, [getAmountValue, amount])

  return isOverlay ? (
    <ItemResourceName animated={false}>
      <Regular>{amount}</Regular>
    </ItemResourceName>
  ) : (
    <NumberInputV2
      min={minValue}
      max={maxValue}
      size="small"
      onChange={newValue => {
        setValue(newValue)
        itemCallback?.(newValue, true)
        getAmountValue?.(newValue)
      }}
      value={value}
    />
  )
}

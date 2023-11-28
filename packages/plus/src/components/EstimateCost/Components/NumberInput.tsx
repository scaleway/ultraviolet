import { NumberInput as UVNumberInput } from '@ultraviolet/ui'
import { useEffect } from 'react'
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

  useEffect(() => {
    getAmountValue?.(amount)
  }, [getAmountValue, amount])

  return isOverlay ? (
    <ItemResourceName animated={false}>
      <Regular>{amount}</Regular>
    </ItemResourceName>
  ) : (
    <UVNumberInput
      minValue={minValue}
      maxValue={maxValue}
      size="small"
      onChange={value => {
        if (typeof value === 'number' && itemCallback) {
          itemCallback(value, true)
          getAmountValue?.(value)
        }
      }}
      value={amount}
    />
  )
}

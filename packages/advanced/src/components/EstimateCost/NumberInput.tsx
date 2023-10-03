import { NumberInput as ScalewayUiNumberInput } from '@ultraviolet/ui'
import { useEffect } from 'react'
import { useOverlay } from './OverlayContext'
import { Regular } from './Regular'
import { styles } from './componentStyle'

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
    <div css={styles.itemResourceName(false)}>
      <Regular>{amount}</Regular>
    </div>
  ) : (
    <ScalewayUiNumberInput
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

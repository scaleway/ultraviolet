import { Text } from '../../Text'
import type { UnitProps } from '../types'
import { numberInputStyle } from '../styles.css'

export const Unit = ({ unit, disabled, readOnly, size, controls }: UnitProps) =>
  unit ? (
    <Text
      as="span"
      className={numberInputStyle.unit({
        disabled,
        readOnly,
        size,
        controls,
      })}
      disabled={disabled}
      sentiment="neutral"
      variant="body"
    >
      {unit}
    </Text>
  ) : null

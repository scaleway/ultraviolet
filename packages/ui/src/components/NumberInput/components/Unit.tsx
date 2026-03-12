import { Text } from '../../Text'
import { numberInputStyle } from '../styles.css'

export const Unit = ({
  unit,
  disabled,
  readOnly,
  size,
}: {
  unit?: string
  disabled?: boolean
  readOnly?: boolean
  size: 'large' | 'medium' | 'small'
}) =>
  unit ? (
    <Text
      as="span"
      className={numberInputStyle.unit({
        disabled,
        readOnly,
        size,
      })}
      disabled={disabled}
      sentiment="neutral"
      variant="body"
    >
      {unit}
    </Text>
  ) : null

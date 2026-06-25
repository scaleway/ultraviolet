import { Text } from '../Text'
import { paginationStyle } from './styles.css'

type EllipsisProps = {
  disabled?: boolean
  size: 'small' | 'medium'
}
export const Ellipsis = ({ disabled, size }: EllipsisProps) => (
  <Text
    aria-label="ellipsis"
    as="span"
    className={paginationStyle.ellipsisClass[size]}
    disabled={disabled}
    placement="center"
    prominence="default"
    sentiment="neutral"
    variant="body"
  >
    ...
  </Text>
)

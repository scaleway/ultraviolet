import { Text } from '../Text'
import { paginationStyle } from './styles.css'

type EllipsisProps = {
  disabled?: boolean
  size: 'small' | 'medium'
  className?: string
}
export const Ellipsis = ({ disabled, size, className }: EllipsisProps) => (
  <Text
    aria-label="ellipsis"
    as="span"
    className={`${paginationStyle.ellipsisClass[size]}${className ? ` ${className}` : ''}`}
    disabled={disabled}
    placement="center"
    prominence="default"
    sentiment="neutral"
    variant="body"
  >
    ...
  </Text>
)

import { RayStartArrowIcon } from '@ultraviolet/icons/RayStartArrowIcon'
import { RayTopArrowIcon } from '@ultraviolet/icons/RayTopArrowIcon'
import { arrow } from '../styles.css'

export const Arrow = ({
  direction,
  size,
}: {
  direction: 'vertical' | 'horizontal'
  size: 'small' | 'large' | 'medium'
}) =>
  direction === 'vertical' ? (
    <RayTopArrowIcon
      className={arrow.vertical}
      prominence="weak"
      sentiment="neutral"
      size={size}
    />
  ) : (
    <RayStartArrowIcon
      className={arrow.horizontal}
      prominence="weak"
      sentiment="neutral"
      size={size}
    />
  )

import { RayStartArrowIcon } from '@ultraviolet/icons/RayStartArrowIcon'
import { RayTopArrowIcon } from '@ultraviolet/icons/RayTopArrowIcon'
import { optionSelectorStyle } from '../styles.css'

export const Arrow = ({
  direction,
  size,
}: {
  direction: 'vertical' | 'horizontal'
  size: 'small' | 'large' | 'medium'
}) =>
  direction === 'vertical' ? (
    <RayTopArrowIcon
      className={optionSelectorStyle.arrow.vertical}
      prominence="weak"
      sentiment="neutral"
      size={size}
    />
  ) : (
    <RayStartArrowIcon
      className={optionSelectorStyle.arrow.horizontal}
      prominence="weak"
      sentiment="neutral"
      size={size}
    />
  )

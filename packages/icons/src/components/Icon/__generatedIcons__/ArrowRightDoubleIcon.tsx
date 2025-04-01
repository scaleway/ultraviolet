/**
 * Provide the icon component for the icon name.
 * This file is automatically generated from /utils/scripts/generate-icons-file.tsx.
 * PLEASE DO NOT EDIT HERE
 */
import { Icon } from '../Icon'
import type { IconProps } from '../Icon'

export const ArrowRightDoubleIcon = ({
  ...props
}: Omit<IconProps, 'children'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props}>
    {typeof props.size === 'string' &&
    ['medium', 'large', 'xlarge', 'xxlarge'].includes(props.size) ? (
      <path
        fillRule="evenodd"
        d="M14.53 9.72a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06l3.72-3.72-3.72-3.72a.75.75 0 0 1 1.06-1.06zM5.28 5.47l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l3.72-3.72-3.72-3.72a.75.75 0 0 1 1.06-1.06"
        clipRule="evenodd"
      />
    ) : (
      <path
        fillRule="evenodd"
        d="M12.78 7.47a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L11.19 8 8.47 5.28a.75.75 0 0 1 1.06-1.06zM4.53 4.22l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L6.19 8 3.47 5.28a.75.75 0 0 1 1.06-1.06"
        clipRule="evenodd"
      />
    )}
  </Icon>
)

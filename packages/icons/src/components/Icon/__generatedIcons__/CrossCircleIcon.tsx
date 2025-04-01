/**
 * Provide the icon component for the icon name.
 * This file is automatically generated from /utils/scripts/generate-icons-file.tsx.
 * PLEASE DO NOT EDIT HERE
 */
import { Icon } from '../Icon'
import type { IconProps } from '../Icon'

/**
 * @deprecated Use CloseCircleOutlineIcon instead.
 */
export const CrossCircleIcon = ({ ...props }: Omit<IconProps, 'children'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props}>
    {typeof props.size === 'string' &&
    ['medium', 'large', 'xlarge', 'xxlarge'].includes(props.size) ? (
      <path
        d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3m-2.293 9.293a1 1 0 0 0-1.414 1.414L14.586 16l-2.293 2.293a1 1 0 0 0 1.414 1.414L16 17.414l2.293 2.293a1 1 0 0 0 1.414-1.414L17.414 16l2.293-2.293a1 1 0 0 0-1.414-1.414L16 14.586z"
        clipRule="evenodd"
      />
    ) : (
      <path
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06"
        clipRule="evenodd"
      />
    )}
  </Icon>
)

/**
 * Provide the icon component for the icon name.
 * This file is automatically generated from /utils/scripts/generate-icons-file.tsx.
 * PLEASE DO NOT EDIT HERE
 */
import { Icon } from '../Icon'
import type { IconProps } from '../Icon'

export const EastIcon = ({ ...props }: Omit<IconProps, 'children'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props}>
    {typeof props.size === 'string' &&
    ['medium', 'large', 'xlarge', 'xxlarge'].includes(props.size) ? (
      <path
        fillRule="evenodd"
        d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10"
        clipRule="evenodd"
      />
    ) : (
      <path
        fillRule="evenodd"
        d="M2 8.25c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75a.75.75 0 0 0-.75.75"
        clipRule="evenodd"
      />
    )}
  </Icon>
)

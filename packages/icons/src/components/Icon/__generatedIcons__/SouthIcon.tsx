/**
 * Provide the icon component for the icon name.
 * This file is automatically generated from /utils/scripts/generate-icons-file.tsx.
 * PLEASE DO NOT EDIT HERE
 */
import { Icon } from '../Icon'
import type { IconProps } from '../Icon'

export const SouthIcon = ({ ...props }: Omit<IconProps, 'children'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props}>
    {props.size === 'large' ? (
      <path
        fillRule="evenodd"
        d="M10 2a.75.75 0 0 1 .75.75v12.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 1 1 1.1-1.02l1.95 2.1V2.75A.75.75 0 0 1 10 2"
        clipRule="evenodd"
      />
    ) : (
      <path
        fillRule="evenodd"
        d="M8 2a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V2.75A.75.75 0 0 1 8 2"
        clipRule="evenodd"
      />
    )}
  </Icon>
)

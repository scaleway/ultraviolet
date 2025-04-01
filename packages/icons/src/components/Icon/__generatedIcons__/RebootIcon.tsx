/**
 * Provide the icon component for the icon name.
 * This file is automatically generated from /utils/scripts/generate-icons-file.tsx.
 * PLEASE DO NOT EDIT HERE
 */
import { Icon } from '../Icon'
import type { IconProps } from '../Icon'

export const RebootIcon = ({ ...props }: Omit<IconProps, 'children'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props}>
    {typeof props.size === 'string' &&
    ['medium', 'large', 'xlarge', 'xxlarge'].includes(props.size) ? (
      <path
        fillRule="evenodd"
        d="M15.1 11.245a5.5 5.5 0 0 1-9.202 2.467l-.312-.312H8.02a.75.75 0 1 0 0-1.5H3.775a.75.75 0 0 0-.75.75l.001 4.242a.75.75 0 1 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 1 0-1.45-.39m1.229-3.723a.75.75 0 0 0 .22-.53l-.001-4.242a.75.75 0 0 0-1.5 0V5.18l-.31-.31a7 7 0 0 0-11.71 3.14.75.75 0 0 0 1.449.389 5.5 5.5 0 0 1 9.202-2.467l.31.311h-2.431a.75.75 0 0 0 0 1.5h4.242a.75.75 0 0 0 .53-.22"
        clipRule="evenodd"
      />
    ) : (
      <path
        fillRule="evenodd"
        d="M13.417 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 1 1 0-1.5h1.372l-.841-.841a4.5 4.5 0 0 0-7.081.932A.75.75 0 0 1 2.386 5a6 6 0 0 1 9.44-1.242l.841.84V3.227a.75.75 0 0 1 .75-.75m-.91 7.5A.75.75 0 0 1 12.78 11a6 6 0 0 1-9.44 1.241l-.841-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75h3.182a.75.75 0 0 1 0 1.5h-1.37l.84.841a4.5 4.5 0 0 0 7.081-.932.75.75 0 0 1 1.025-.273"
        clipRule="evenodd"
      />
    )}
  </Icon>
)

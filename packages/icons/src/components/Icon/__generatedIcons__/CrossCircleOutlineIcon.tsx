'use client'

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
export const CrossCircleOutlineIcon = ({
  ...props
}: Omit<IconProps, 'children'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props}>
    {typeof props.size === 'string' &&
    ['medium', 'large', 'xlarge', 'xxlarge'].includes(props.size) ? (
      <path
        d="M16 5.438C10.166 5.438 5.438 10.166 5.438 16S10.166 26.563 16 26.563 26.563 21.833 26.563 16 21.833 5.438 16 5.438M3 16C3 8.82 8.82 3 16 3s13 5.82 13 13-5.82 13-13 13S3 23.18 3 16m9.193-3.807a1.22 1.22 0 0 1 1.723 0L16 14.276l2.084-2.083a1.219 1.219 0 1 1 1.723 1.723L17.724 16l2.083 2.084a1.219 1.219 0 1 1-1.723 1.723L16 17.724l-2.084 2.083a1.219 1.219 0 1 1-1.723-1.723L14.276 16l-2.083-2.084a1.22 1.22 0 0 1 0-1.723"
        clipRule="evenodd"
      />
    ) : (
      <path
        d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8m4.907-2.093a.75.75 0 0 1 1.06 0L8 6.94l1.032-1.032a.75.75 0 1 1 1.06 1.06L9.062 8l1.032 1.032a.75.75 0 1 1-1.06 1.06L8 9.062l-1.032 1.032a.75.75 0 1 1-1.06-1.06L6.938 8 5.907 6.968a.75.75 0 0 1 0-1.06"
        clipRule="evenodd"
      />
    )}
  </Icon>
)

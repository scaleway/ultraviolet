/**
 * Provide the icon component for the icon name.
 * This file is automatically generated from /utils/scripts/generate-icons-file.tsx.
 * PLEASE DO NOT EDIT HERE
 */
import { Icon } from '../Icon'
import type { IconProps } from '../Icon'

export const MosaicIcon = ({ ...props }: Omit<IconProps, 'children'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props}>
    {typeof props.size === 'string' &&
    ['medium', 'large', 'xlarge', 'xxlarge'].includes(props.size) ? (
      <path d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11z" />
    ) : (
      <>
        <path d="M2.75 1C1.7835 1 1 1.7835 1 2.75V5.08333C1 6.04983 1.7835 6.83333 2.75 6.83333H5.08333C6.04983 6.83333 6.83333 6.04983 6.83333 5.08333V2.75C6.83333 1.7835 6.04983 1 5.08333 1H2.75Z" />
        <path d="M2.75 9.16667C1.7835 9.16667 1 9.95017 1 10.9167V13.25C1 14.2165 1.7835 15 2.75 15H5.08333C6.04983 15 6.83333 14.2165 6.83333 13.25V10.9167C6.83333 9.95017 6.04983 9.16667 5.08333 9.16667H2.75Z" />
        <path d="M9.16667 2.75C9.16667 1.7835 9.95017 1 10.9167 1H13.25C14.2165 1 15 1.7835 15 2.75V5.08333C15 6.04983 14.2165 6.83333 13.25 6.83333H10.9167C9.95017 6.83333 9.16667 6.04983 9.16667 5.08333V2.75Z" />
        <path d="M10.9167 9.16667C9.95017 9.16667 9.16667 9.95017 9.16667 10.9167V13.25C9.16667 14.2165 9.95017 15 10.9167 15H13.25C14.2165 15 15 14.2165 15 13.25V10.9167C15 9.95017 14.2165 9.16667 13.25 9.16667H10.9167Z" />
      </>
    )}
  </Icon>
)

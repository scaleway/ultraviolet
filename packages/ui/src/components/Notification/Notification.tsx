'use client'

import { CloseIcon } from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import type {
  Theme as ThemeToastify,
  ToastOptions,
  TypeOptions,
} from 'react-toastify'
import { toast as baseToast } from 'react-toastify'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'

type CloseButtonProps = {
  closeToast: (event: React.MouseEvent<HTMLElement>) => void
  type: TypeOptions
  ariaLabel?: string
  theme: ThemeToastify
}

const closeButton = (props: CloseButtonProps) => (
  <Button
    aria-label="close"
    onClick={props.closeToast}
    sentiment="neutral"
    size="xsmall"
    variant="ghost"
  >
    <CloseIcon />
  </Button>
)

export const notification = (
  children: ((props: CloseButtonProps) => ReactNode) | ReactNode,
  title: string,
  icon?: ReactNode,
  isClosable?: boolean,
  containerId?: string,
  options?: ToastOptions,
) =>
  baseToast('', {
    ...options,
    closeButton: props => (
      <Stack direction="row" gap={2}>
        <div>{icon}</div>
        <Stack direction="column">
          <Text as="h3" variant="bodySmallStronger">
            {title}
          </Text>
          {typeof children === 'function' ? children(props) : children}
        </Stack>
        {isClosable ? closeButton(props) : null}
      </Stack>
    ),
    containerId: containerId ?? 'notification',
  })

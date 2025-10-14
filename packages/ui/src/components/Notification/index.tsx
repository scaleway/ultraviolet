'use client'

import { CloseIcon } from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import type {
  Theme as ThemeToastify,
  ToastOptions,
  TypeOptions,
} from 'react-toastify'
import {
  ToastContainer as BaseToastContainer,
  toast as baseToast,
  Slide,
} from 'react-toastify'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { notification as notificationStyle } from './styles.css'

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

type NotificationContainerProps = {
  /**
   * Delay (in ms) before the notification autocloses. To disable autoclose, set to false
   */
  autoClose?: false | number
  /**
   * Whether to display the newest toast on top.
   * `Default: false`
   */
  newestOnTop?: boolean
  /**
   * Limit the number of toast displayed at the same time
   */
  limit?: number
  /**
   * Position on the notification container
   */
  position?: ToastOptions['position']
  'data-testid'?: string
  className?: string
  /**
   * Give a personalized containerId in case there are multiple notifications with different styled to display
   */
  containerId?: string
}

export const NotificationContainer = ({
  newestOnTop,
  limit,
  autoClose = false,
  position = 'top-right',
  'data-testid': dataTestId,
  className,
  containerId = 'notification',
}: NotificationContainerProps) => (
  <BaseToastContainer
    autoClose={autoClose}
    className={`${className ? `${className} ` : ''}${notificationStyle}`}
    containerId={containerId}
    data-testid={dataTestId}
    draggable={false}
    hideProgressBar
    icon={false}
    limit={limit}
    newestOnTop={newestOnTop}
    position={position}
    transition={Slide}
  />
)

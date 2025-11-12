'use client'

import { CloseIcon } from '@ultraviolet/icons'
import type { CSSProperties, ReactNode } from 'react'
import type { ToastOptions } from 'react-toastify'
import {
  ToastContainer as BaseToastContainer,
  toast as baseToast,
  Slide,
} from 'react-toastify'
import type { SENTIMENTS } from '../../theme'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { ToastButton } from './components/Button'
import { ToastLink } from './components/Link'
import { closeButtonToaster, toaster } from './styles.css'

const AUTOCLOSE_DELAY = 6000 // Delay to close the toast in ms
type SENTIMENT = (typeof SENTIMENTS)[number]

type CloseButtonProps = {
  closeToast?: () => void
  sentiment: SENTIMENT
}
const CloseButton = ({
  closeToast,
  sentiment = 'success',
}: CloseButtonProps) => (
  <Button
    aria-label="close"
    className={closeButtonToaster}
    onClick={closeToast}
    sentiment={sentiment}
    size="xsmall"
  >
    <CloseIcon />
  </Button>
)

type ContentProps = {
  children?: ReactNode
}

const Content = ({ children }: ContentProps) => (
  <Stack direction="row" gap={2} width="100%">
    {typeof children === 'string' ? (
      <Text as="span" variant="bodySmallStrong">
        {children}
      </Text>
    ) : (
      children
    )}
  </Stack>
)

export const toast = {
  error: (
    children: ReactNode,
    options?: ToastOptions,
    containerId?: string,
  ): number | string =>
    baseToast.error(<Content>{children}</Content>, {
      ...options,
      closeButton: <CloseButton sentiment="danger" />,
      containerId: containerId ?? 'toaster',
    }),

  success: (
    children: ReactNode,
    options?: ToastOptions,
    containerId?: string,
  ): number | string =>
    baseToast.success(<Content>{children}</Content>, {
      ...options,
      closeButton: <CloseButton sentiment="success" />,
      containerId: containerId ?? 'toaster',
    }),

  warning: (
    children: ReactNode,
    options?: ToastOptions,
    containerId?: string,
  ): number | string =>
    baseToast.warn(<Content>{children}</Content>, {
      ...options,
      closeButton: <CloseButton sentiment="warning" />,
      containerId: containerId ?? 'toaster',
    }),
}

type ToastContainerProps = {
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
   * Position of the toast container
   */
  position?: ToastOptions['position']
  'data-testid'?: string
  className?: string
  /**
   * Delay before the toast is automatically closed, if not set the default value is 6000ms
   */
  autoClose?: number

  /**
   * Set a custom containerId to be able to define multiple ToastContainers
   */
  containerId?: string
  style?: CSSProperties
}

/**
 * Display short information about an event that happen in the interface in a floating alert.
 * Toaster is based on **react-tostify**, you can find a complete documentation
 * [here](https://fkhadra.github.io/react-toastify/introduction/).
 *
 * Toaster is separated in two parts, first the `ToastContainer` which is where the div of the toast will be rendered,
 * and second the `toast()` function which is used to display the toast.
 */
export const ToastContainer = ({
  newestOnTop,
  limit,
  position = 'top-right',
  'data-testid': dataTestId,
  className,
  autoClose,
  containerId = 'toaster',
  style,
}: ToastContainerProps) => (
  <BaseToastContainer
    autoClose={autoClose ?? AUTOCLOSE_DELAY}
    className={`${className ? `${className} ` : ''}${toaster}`}
    containerId={containerId}
    data-testid={dataTestId}
    draggable={false}
    hideProgressBar
    icon={false}
    limit={limit}
    newestOnTop={newestOnTop}
    pauseOnFocusLoss={false}
    pauseOnHover={false}
    position={position}
    stacked
    style={style}
    transition={Slide}
  />
)

export const Toast = {
  Button: ToastButton,
  Link: ToastLink,
}

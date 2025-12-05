'use client'

import { cn } from '@ultraviolet/themes'
import type { CSSProperties } from 'react'
import type { ToastOptions } from 'react-toastify'
import { ToastContainer as BaseToastContainer, Slide } from 'react-toastify'
import { AUTOCLOSE_DELAY } from './constants'
import { toaster } from './styles.css'

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
    className={cn(className, toaster)}
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

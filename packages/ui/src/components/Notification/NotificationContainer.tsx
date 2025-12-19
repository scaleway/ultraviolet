'use client'

import { cn } from '@ultraviolet/utils'
import type { CSSProperties } from 'react'
import type { ToastOptions } from 'react-toastify'
import { ToastContainer as BaseToastContainer, Slide } from 'react-toastify'
import { notification as notificationStyle } from './styles.css'

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
  style?: CSSProperties
}

export const NotificationContainer = ({
  newestOnTop,
  limit,
  autoClose = false,
  position = 'top-right',
  'data-testid': dataTestId,
  className,
  style,
  containerId = 'notification',
}: NotificationContainerProps) => (
  <BaseToastContainer
    autoClose={autoClose}
    className={cn(className, notificationStyle)}
    containerId={containerId}
    data-testid={dataTestId}
    draggable={false}
    hideProgressBar
    icon={false}
    limit={limit}
    newestOnTop={newestOnTop}
    position={position}
    style={style}
    transition={Slide}
  />
)

'use client'

import type { ReactNode } from 'react'
import type { ToastOptions } from 'react-toastify'
import { toast as baseToast } from 'react-toastify'
import { CloseButton } from './components/CloseButton'
import { Content } from './components/Content'

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

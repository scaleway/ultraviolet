'use client'

import { AlertCircleOutlineIcon } from '@ultraviolet/icons/AlertCircleOutlineIcon'
import { CheckCircleOutlineIcon } from '@ultraviolet/icons/CheckCircleOutlineIcon'
import { CloseCircleOutlineIcon } from '@ultraviolet/icons/CloseCircleOutlineIcon'
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
    baseToast.error(
      <Content icon={<CloseCircleOutlineIcon size="medium" />}>
        {children}
      </Content>,
      {
        ...options,
        closeButton: <CloseButton sentiment="danger" />,
        containerId: containerId ?? 'toaster',
      },
    ),

  success: (
    children: ReactNode,
    options?: ToastOptions,
    containerId?: string,
  ): number | string =>
    baseToast.success(
      <Content icon={<CheckCircleOutlineIcon size="medium" />}>
        {children}
      </Content>,
      {
        ...options,
        closeButton: <CloseButton sentiment="success" />,
        containerId: containerId ?? 'toaster',
      },
    ),

  warning: (
    children: ReactNode,
    options?: ToastOptions,
    containerId?: string,
  ): number | string =>
    baseToast.warn(
      <Content icon={<AlertCircleOutlineIcon size="medium" />}>
        {children}
      </Content>,
      {
        ...options,
        closeButton: <CloseButton sentiment="warning" />,
        containerId: containerId ?? 'toaster',
      },
    ),
}

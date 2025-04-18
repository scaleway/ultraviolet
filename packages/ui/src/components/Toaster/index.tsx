'use client'

import type { Theme } from '@emotion/react'
import { ClassNames, css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import type { ToastOptions } from 'react-toastify'
import {
  ToastContainer as BaseToastContainer,
  Slide,
  toast as baseToast,
} from 'react-toastify'
import type { SENTIMENTS } from '../../theme'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { ToastButton } from './components/Button'
import { ToastLink } from './components/Link'

const PREFIX = '.Toastify'
const AUTOCLOSE_DELAY = 6000 // Delay to close the toast in ms
type SENTIMENT = (typeof SENTIMENTS)[number]

const styles = {
  toast: (theme: Theme) => css`
    border-radius: ${theme.radii.default};
    min-height: ${theme.sizing['700']};

    ${PREFIX}__toast-container {
      width: 21.5rem;
    }

    ${PREFIX}__toast-body {
      margin: 0;
      padding: 0;
    }

    &${PREFIX}__toast--success {
      background-color: ${theme.colors.neutral.backgroundStronger};
      color: ${theme.colors.neutral.textStronger};
      padding: ${theme.space['2']};
    }

    &${PREFIX}__toast--info {
      background-color: ${theme.colors.info.backgroundStrong};
      color: ${theme.colors.neutral.textStronger};
      padding: ${theme.space['2']};
    }

    &${PREFIX}__toast--error {
      background-color: ${theme.colors.danger.backgroundStrong};
      color: ${theme.colors.neutral.textStronger};
      padding: ${theme.space['2']};
    }

    &${PREFIX}__toast--warning {
      background-color: ${theme.colors.warning.backgroundStrong};
      color: ${theme.colors.warning.textStrong};
      padding: ${theme.space['2']};
    }
  `,
}

type CloseButtonProps = {
  closeToast?: () => void
  sentiment: SENTIMENT
}

const StyledButton = styled(Button)`
  background: none;
  margin: auto;
  margin-left: ${({ theme }) => theme.space['1']};
  &:hover,
  &:active {
    background: none;
    box-shadow: none;
    border: none;
  }
`

const CloseButton = ({
  closeToast,
  sentiment = 'success',
}: CloseButtonProps) => (
  <StyledButton
    aria-label="close"
    icon="close"
    onClick={closeToast}
    sentiment={sentiment}
    size="xsmall"
  />
)

type ContentProps = {
  children?: ReactNode
}

const Content = ({ children }: ContentProps) => (
  <Stack gap={2} direction="row" width="100%">
    {typeof children === 'string' ? (
      <Text variant="bodySmallStrong" as="span">
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
  /**
   * @deprecated "Deprecated, please use another variant instead"
   */
  info: (
    children: ReactNode,
    options?: ToastOptions,
    containerId?: string,
  ): number | string =>
    baseToast.info(<Content>{children}</Content>, {
      ...options,
      closeButton: <CloseButton sentiment="info" />,
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
}: ToastContainerProps) => {
  const theme = useTheme()

  return (
    <ClassNames>
      {/* eslint-disable-next-line @typescript-eslint/unbound-method */}
      {({ css: localCss }) => (
        <BaseToastContainer
          data-testid={dataTestId}
          toastClassName={localCss(styles.toast(theme))}
          autoClose={autoClose ?? AUTOCLOSE_DELAY}
          icon={false}
          newestOnTop={newestOnTop}
          limit={limit}
          position={position}
          stacked
          hideProgressBar
          className={className}
          transition={Slide}
          containerId={containerId}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
      )}
    </ClassNames>
  )
}

export const Toast = {
  Button: ToastButton,
  Link: ToastLink,
}

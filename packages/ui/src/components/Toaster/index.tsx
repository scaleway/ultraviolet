import type { Theme } from '@emotion/react'
import { ClassNames, Global, css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import type { ToastOptions } from 'react-toastify'
import {
  ToastContainer as BaseToastContainer,
  toast as baseToast,
} from 'react-toastify'
import style from 'react-toastify/dist/ReactToastify.min.css'
import type { SENTIMENTS } from '../../theme'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'

const PREFIX = '.Toastify'
const AUTOCLOSE_DELAY = 6000 // Delay to close the toast in ms
type SENTIMENT = (typeof SENTIMENTS)[number]

const styles = {
  toast: (theme: Theme) => css`
    border-radius: ${theme.radii.default};
    min-height: 52px;
    padding: ${theme.space['2']};

    ${PREFIX}__toast-container {
      width: 344px;
    }

    ${PREFIX}__toast-body {
      margin: 0;
    }

    &${PREFIX}__toast--success {
      background-color: ${theme.colors.neutral.backgroundStronger};
      color: ${theme.colors.neutral.textStronger};
    }

    &${PREFIX}__toast--info {
      background-color: ${theme.colors.info.backgroundStrong};
      color: ${theme.colors.neutral.textStronger};
    }

    &${PREFIX}__toast--error {
      background-color: ${theme.colors.danger.backgroundStrong};
      color: ${theme.colors.neutral.textStronger};
    }

    &${PREFIX}__toast--warning {
      background-color: ${theme.colors.warning.backgroundStrong};
      color: ${theme.colors.warning.textStrong};
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
  &:hover,
  &:active {
    background: none;
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
  <Stack gap={2} direction="row">
    <Text variant="bodySmallStrong" as="span">
      {children}
    </Text>
  </Stack>
)

export const toast = {
  error: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.error(<Content>{children}</Content>, {
      ...options,
      closeButton: <CloseButton sentiment="danger" />,
    }),
  /**
   * @deprecated "Deprecated, please use another variant instead"
   */
  // eslint-disable-next-line deprecation/deprecation
  info: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.info(<Content>{children}</Content>, {
      ...options,
      closeButton: <CloseButton sentiment="info" />,
    }),

  success: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.success(<Content>{children}</Content>, {
      ...options,
      closeButton: <CloseButton sentiment="success" />,
    }),

  warning: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.warn(<Content>{children}</Content>, {
      ...options,
      closeButton: <CloseButton sentiment="warning" />,
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
}: ToastContainerProps) => {
  const theme = useTheme()

  return (
    <>
      <Global styles={style} />
      <ClassNames>
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
          />
        )}
      </ClassNames>
    </>
  )
}

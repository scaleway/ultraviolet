import type { Theme } from '@emotion/react'
import { ClassNames, Global, css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import type { ToastOptions } from 'react-toastify'
import {
  ToastContainer as BaseToastContainer,
  toast as baseToast,
} from 'react-toastify'
import style from 'react-toastify/dist/ReactToastify.min.css'
import { Stack } from '../Stack'
import { Text } from '../Text'

const PREFIX = '.Toastify'
const AUTOCLOSE_DELAY = 6000 // Delay to close the toast in ms

const TOAST_ICONS = {
  warning: 'alert',
  info: 'information-outline',
  success: 'checkbox-circle-outline',
  danger: 'alert',
} as const

const styles = {
  toast: (theme: Theme) => css`
    border-radius: ${theme.radii.default};
    box-shadow: ${theme.shadows.dropdown};
    min-height: 44px;
    margin-bottom: ${theme.space['2']};

    ${PREFIX}__toast-body {
      margin: 0;
      padding: 0;
    }

    &${PREFIX}__toast--success {
      background-color: ${theme.colors.success.background};
      color: ${theme.colors.success.text};

      ${PREFIX}__progress-bar {
        background-color: ${theme.colors.success.backgroundStrong};
      }
    }

    &${PREFIX}__toast--info {
      background-color: ${theme.colors.info.background};
      color: ${theme.colors.info.text};

      ${PREFIX}__progress-bar {
        background-color: ${theme.colors.info.backgroundStrong};
      }
    }

    &${PREFIX}__toast--error {
      background-color: ${theme.colors.danger.background};
      color: ${theme.colors.danger.text};

      ${PREFIX}__progress-bar {
        background-color: ${theme.colors.danger.backgroundStrong};
      }
    }
  `,
}

const CloseButtonWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  padding: 0;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.space['2']};
`

type CloseButtonProps = {
  closeToast?: () => void
}

const IconWithLeftMargin = styled(Icon)`
  margin-left: ${({ theme }) => theme.space['1']};
`

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <CloseButtonWrapper type="button" onClick={closeToast}>
    <IconWithLeftMargin name="close" size={18} />
  </CloseButtonWrapper>
)

type ContentProps = {
  children?: ReactNode
  variant: 'danger' | 'info' | 'success'
}

const Content = ({ variant, children }: ContentProps) => (
  <Stack gap={2} direction="row">
    <Icon name={TOAST_ICONS[variant]} size={24} />
    <Text variant="body" as="span" color={variant}>
      {children}
    </Text>
  </Stack>
)

export const toast = {
  error: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.error(<Content variant="danger">{children}</Content>, options),
  info: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.info(<Content variant="info">{children}</Content>, options),
  success: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.success(<Content variant="success">{children}</Content>, options),
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
  position,
  'data-testid': dataTestId,
}: ToastContainerProps) => {
  const theme = useTheme()

  return (
    <>
      <Global styles={style} />
      <ClassNames>
        {({ css: localCss }) => (
          <BaseToastContainer
            data-testid={dataTestId}
            closeButton={<CloseButton />}
            toastClassName={localCss(styles.toast(theme))}
            autoClose={AUTOCLOSE_DELAY}
            icon={false}
            newestOnTop={newestOnTop}
            limit={limit}
            position={position}
            css={css`
              top: 100px;
              right: calc(0% + ${theme.space['2']});
            `}
          />
        )}
      </ClassNames>
    </>
  )
}

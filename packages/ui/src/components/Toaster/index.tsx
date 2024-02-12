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

const styles = {
  toast: (theme: Theme) => css`
    border-radius: ${theme.radii.default};
    min-height: 52px;
    width: 344px;
    padding: 16px 16px 16px 16px;
    gap: 16px;

    ${PREFIX}__toast-body {
      margin: 0;
      padding: 0;
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

const CloseButtonWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  padding: 0;
  margin: 0;
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
}

const Content = ({ children }: ContentProps) => (
  <Stack gap={2} direction="row">
    <Text variant="body" as="span">
      {children}
    </Text>
  </Stack>
)

export const toast = {
  error: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.error(<Content>{children}</Content>, options),
  info: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.info(<Content>{children}</Content>, options),
  success: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.success(<Content>{children}</Content>, options),
  warning: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.warn(<Content>{children}</Content>, options),
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
  position = 'top-right',
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
            stacked
            hideProgressBar
          />
        )}
      </ClassNames>
    </>
  )
}

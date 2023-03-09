import type { Theme } from '@emotion/react'
import { ClassNames, Global, css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import type { ToastOptions } from 'react-toastify'
import {
  ToastContainer as BaseToastContainer,
  toast as baseToast,
} from 'react-toastify'
import style from 'react-toastify/dist/ReactToastify.min.css'
import { Alert } from '../Alert'
import { Icon } from '../Icon'

const PREFIX = '.Toastify'
const AUTOCLOSE_DELAY = 6000 // Delay to close the toast in ms

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

const StyledAlert = styled(Alert)`
  padding: 0;
`

type SanitizedAlertBarProps = {
  children?: ReactNode
} & ComponentProps<typeof Alert>

const SanitizedAlertBar = ({ variant, children }: SanitizedAlertBarProps) => (
  <StyledAlert variant={variant}>{children}</StyledAlert>
)

export const toast = {
  error: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.error(
      <SanitizedAlertBar variant="danger">{children}</SanitizedAlertBar>,
      options,
    ),
  info: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.info(
      <SanitizedAlertBar variant="info">{children}</SanitizedAlertBar>,
      options,
    ),
  success: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.success(
      <SanitizedAlertBar variant="success">{children}</SanitizedAlertBar>,
      options,
    ),
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
}

export const ToastContainer = ({
  newestOnTop,
  limit,
  position,
}: ToastContainerProps) => {
  const theme = useTheme()

  return (
    <>
      <Global styles={style} />
      <ClassNames>
        {({ css: localCss }) => (
          <BaseToastContainer
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

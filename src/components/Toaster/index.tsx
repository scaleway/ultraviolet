import { ClassNames, Global, Theme, css, useTheme } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'
import {
  ToastContainer as BaseToastContainer,
  ToastContainerProps,
  ToastOptions,
  toast as baseToast,
} from 'react-toastify'
import style from 'react-toastify/dist/ReactToastify.min.css'
import Alert, { AlertProps } from '../Alert'
import Icon from '../Icon'

const PREFIX = '.Toastify'

const styles = {
  toast: (theme: Theme) => css`
    border-radius: 4px;
    box-shadow: none;
    min-height: 0;

    ${PREFIX}__toast-body {
      margin: 0;
      padding: 0;
    }

    &${PREFIX}__toast--success {
      background-color: ${theme.colors.foam};
      color: ${theme.colors.success};

      ${PREFIX}__progress-bar {
        background-color: ${theme.colors.success};
      }
    }

    &${PREFIX}__toast--info {
      background-color: ${theme.colors.zumthor};
      color: ${theme.colors.info};

      ${PREFIX}__progress-bar {
        background-color: ${theme.colors.info};
      }
    }

    &${PREFIX}__toast--warning {
      background-color: ${theme.colors.pippin};
      color: ${theme.colors.warning};

      ${PREFIX}__progress-bar {
        background-color: ${theme.colors.warning};
      }
    }

    &${PREFIX}__toast--error {
      background-color: ${theme.colors.pippin};
      color: ${theme.colors.warning};

      ${PREFIX}__progress-bar {
        background-color: ${theme.colors.warning};
      }
    }
  `,
}

type CloseButtonProps = {
  closeToast?: () => void
}

const CloseButton: FunctionComponent<CloseButtonProps> = ({ closeToast }) => (
  <Icon name="close" size={18} ml={1} onClick={closeToast} />
)

CloseButton.propTypes = {
  closeToast: PropTypes.func,
}

type SanitizedAlertBarProps = {
  closeToast?: () => void
  toastProps?: Record<string, unknown>
  children?: ReactNode
} & AlertProps

const SanitizedAlertBar: FunctionComponent<SanitizedAlertBarProps> = ({
  closeToast,
  toastProps,
  children,
  ...props
}) => <Alert {...props}>{children}</Alert>

SanitizedAlertBar.propTypes = {
  children: PropTypes.node,
  closeToast: PropTypes.func,
  toastProps: PropTypes.shape({}),
}

const toast = {
  error: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.error(
      <SanitizedAlertBar type="warning" iconSize={24} p={0}>
        {children}
      </SanitizedAlertBar>,
      options,
    ),
  info: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.info(
      <SanitizedAlertBar type="info" iconSize={24} p={0}>
        {children}
      </SanitizedAlertBar>,
      options,
    ),
  success: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.success(
      <SanitizedAlertBar type="success" iconSize={24} p={0}>
        {children}
      </SanitizedAlertBar>,
      options,
    ),
  warn: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.warn(
      <SanitizedAlertBar type="warning" iconSize={24} p={0}>
        {children}
      </SanitizedAlertBar>,
      options,
    ),
}

const ToastContainer = (props: ToastContainerProps): JSX.Element => {
  const theme = useTheme()

  return (
    <>
      <Global styles={style} />
      <ClassNames>
        {({ css: localCss }) => (
          <BaseToastContainer
            closeButton={<CloseButton />}
            toastClassName={localCss(styles.toast(theme))}
            {...props}
          />
        )}
      </ClassNames>
    </>
  )
}

export default ToastContainer
export { toast }

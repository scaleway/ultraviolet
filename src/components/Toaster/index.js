import { ClassNames, Global, css, useTheme } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import {
  ToastContainer as BaseToastContainer,
  toast as baseToast,
} from 'react-toastify'
import style from 'react-toastify/dist/ReactToastify.min.css'
import Alert from '../Alert'
import Icon from '../Icon'

const PREFIX = '.Toastify'

const styles = {
  toast: theme => css`
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

const CloseButton = ({ closeToast }) => (
  <Icon name="close" size={18} ml={1} onClick={closeToast} />
)

CloseButton.propTypes = {
  closeToast: PropTypes.func,
}

CloseButton.defaultProps = {
  closeToast: () => {},
}

const SanitizedAlertBar = ({ closeToast, toastProps, children, ...props }) => (
  <Alert {...props}>{children}</Alert>
)

SanitizedAlertBar.propTypes = {
  children: PropTypes.node,
  closeToast: PropTypes.func,
  toastProps: PropTypes.shape({}),
}

SanitizedAlertBar.defaultProps = {
  children: null,
  closeToast: undefined,
  toastProps: undefined,
}

const toast = {
  error: (children, options) =>
    baseToast.error(
      <SanitizedAlertBar variant="warning" p={0}>
        {children}
      </SanitizedAlertBar>,
      options,
    ),
  info: (children, options) =>
    baseToast.info(
      <SanitizedAlertBar variant="info" p={0}>
        {children}
      </SanitizedAlertBar>,
      options,
    ),
  success: (children, options) =>
    baseToast.success(
      <SanitizedAlertBar variant="success" p={0}>
        {children}
      </SanitizedAlertBar>,
      options,
    ),
  warn: (children, options) =>
    baseToast.warn(
      <SanitizedAlertBar variant="warning" p={0}>
        {children}
      </SanitizedAlertBar>,
      options,
    ),
}

const ToastContainer = props => {
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

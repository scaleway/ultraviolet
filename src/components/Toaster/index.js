import { ClassNames, css, useTheme } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import {
  ToastContainer as BaseToastContainer,
  toast as baseToast,
} from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'
import Icon from '../Icon'
import NotificationBar from '../NotificationBar'

injectStyle()

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

const SanitizedNotificationBar = ({
  closeToast,
  toastProps,
  children,
  ...props
}) => <NotificationBar {...props}>{children}</NotificationBar>

SanitizedNotificationBar.propTypes = {
  closeToast: PropTypes.func,
  toastProps: PropTypes.shape({}),
  children: PropTypes.node,
}

SanitizedNotificationBar.defaultProps = {
  closeToast: undefined,
  toastProps: undefined,
  children: null,
}

const toast = {
  success: (children, options) =>
    baseToast.success(
      <SanitizedNotificationBar variant="success" p={0}>
        {children}
      </SanitizedNotificationBar>,
      options,
    ),
  info: (children, options) =>
    baseToast.info(
      <SanitizedNotificationBar variant="info" p={0}>
        {children}
      </SanitizedNotificationBar>,
      options,
    ),
  warn: (children, options) =>
    baseToast.warn(
      <SanitizedNotificationBar variant="warning" p={0}>
        {children}
      </SanitizedNotificationBar>,
      options,
    ),
  error: (children, options) =>
    baseToast.error(
      <SanitizedNotificationBar variant="warning" p={0}>
        {children}
      </SanitizedNotificationBar>,
      options,
    ),
}

const ToastContainer = props => {
  const theme = useTheme()

  return (
    <ClassNames>
      {({ css: localCss }) => (
        <BaseToastContainer
          closeButton={<CloseButton />}
          toastClassName={localCss(styles.toast(theme))}
          {...props}
        />
      )}
    </ClassNames>
  )
}

export default ToastContainer
export { toast }

import { ClassNames, css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import {
  toast as baseToast,
  ToastContainer as BaseToastContainer,
} from 'react-toastify'
import toastStyle from 'react-toastify/dist/ReactToastify.min.css'
import { foam, info, pippin, success, warning, zumthor } from '../../theming'
import { Icon } from '../Icon'
import { NotificationBar } from '../NotificationBar'

const PREFIX = '.Toastify'

const styles = {
  toast: p => css`
    border-radius: 4px;
    box-shadow: none;
    min-height: 0;

    ${PREFIX}__toast-body {
      margin: 0;
      padding: 0;
    }

    &${PREFIX}__toast--success {
      background-color: ${foam(p)};
      color: ${success(p)};

      ${PREFIX}__progress-bar {
        background-color: ${success(p)};
      }
    }

    &${PREFIX}__toast--info {
      background-color: ${zumthor(p)};
      color: ${info(p)};

      ${PREFIX}__progress-bar {
        background-color: ${info(p)};
      }
    }

    &${PREFIX}__toast--warning {
      background-color: ${pippin(p)};
      color: ${warning(p)};

      ${PREFIX}__progress-bar {
        background-color: ${warning(p)};
      }
    }

    &${PREFIX}__toast--error {
      background-color: ${pippin(p)};
      color: ${warning(p)};

      ${PREFIX}__progress-bar {
        background-color: ${warning(p)};
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

const SanitizedNotificationBar = ({ closeToast, children, ...props }) => (
  <NotificationBar {...props}>{children}</NotificationBar>
)

SanitizedNotificationBar.propTypes = {
  closeToast: PropTypes.func,
  children: PropTypes.node,
}

SanitizedNotificationBar.defaultProps = {
  closeToast: null,
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

const ToastContainer = props => (
  <ClassNames>
    {({ css }) => (
      <BaseToastContainer
        closeButton={<CloseButton />}
        toastClassName={css([styles.toast(props), toastStyle])}
        {...props}
      />
    )}
  </ClassNames>
)

export { toast, ToastContainer }

import { ClassNames, Global, Theme, css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { ComponentProps, FunctionComponent, ReactNode } from 'react'
import {
  ToastContainer as BaseToastContainer,
  ToastOptions,
  toast as baseToast,
} from 'react-toastify'
import style from 'react-toastify/dist/ReactToastify.min.css'
import Alert, { alertTypes } from '../Alert'
import Icon from '../Icon'

const PREFIX = '.Toastify'
const AUTOCLOSE_DELAY = 6000 // Delay to close the toast in ms

const styles = {
  toast: (theme: Theme) => css`
    border-radius: 4px;
    box-shadow: none;
    min-height: 44px;

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

type CloseButtonProps = {
  closeToast?: () => void
}

const CloseButton: FunctionComponent<CloseButtonProps> = ({ closeToast }) => (
  <Icon name="close" size={18} ml={1} onClick={closeToast} />
)

CloseButton.propTypes = {
  closeToast: PropTypes.func,
}

const StyledAlert = styled(Alert)`
  padding: 0;
`

type SanitizedAlertBarProps = {
  children?: ReactNode
} & ComponentProps<typeof Alert>

const SanitizedAlertBar: FunctionComponent<SanitizedAlertBarProps> = ({
  type,
  children,
}) => (
  <StyledAlert type={type} iconSize={24}>
    {children}
  </StyledAlert>
)

SanitizedAlertBar.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(alertTypes),
}

const toast = {
  error: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.error(
      <SanitizedAlertBar type="warning">{children}</SanitizedAlertBar>,
      options,
    ),
  info: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.info(
      <SanitizedAlertBar type="info">{children}</SanitizedAlertBar>,
      options,
    ),
  success: (children: ReactNode, options?: ToastOptions): number | string =>
    baseToast.success(
      <SanitizedAlertBar type="success">{children}</SanitizedAlertBar>,
      options,
    ),
}

const ToastContainer = (): JSX.Element => {
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
          />
        )}
      </ClassNames>
    </>
  )
}

export default ToastContainer
export { toast }

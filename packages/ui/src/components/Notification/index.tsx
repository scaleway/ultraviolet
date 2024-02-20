import type { Theme } from '@emotion/react'
import { ClassNames, Global, css, useTheme } from '@emotion/react'
import type { ReactNode } from 'react'
import {
  ToastContainer as BaseToastContainer,
  Slide,
  toast as baseToast,
} from 'react-toastify'
import type {
  Theme as ThemeToastify,
  ToastOptions,
  TypeOptions,
} from 'react-toastify'
import style from 'react-toastify/dist/ReactToastify.min.css'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'

const PREFIX = '.Toastify'
type StylesProps = {
  theme: Theme
}

type CloseButtonProps = {
  closeToast: (e: React.MouseEvent<HTMLElement>) => void
  type: TypeOptions
  ariaLabel?: string
  theme: ThemeToastify
}

const styles = {
  toast: ({ theme }: StylesProps) => css`
    border-radius: ${theme.radii.default};

    &${PREFIX}__toast {
      background-color: ${theme.colors.neutral.background};
      color: ${theme.colors.neutral.text};
      padding: ${theme.space['2']};
      box-shadow: ${theme.shadows.defaultShadow};
    }

    &${PREFIX}__toast-container {
      width: 312px;
    }

    ${PREFIX}__toast-body {
      margin: 0;
      padding: 0;
    }
  `,
}

const closeButton = (props: CloseButtonProps) => (
  <Button
    aria-label="close"
    icon="close"
    sentiment="neutral"
    variant="ghost"
    onClick={props.closeToast}
    size="xsmall"
  />
)

export const notification = (
  children: ((props: CloseButtonProps) => ReactNode) | ReactNode,
  title: string,
  icon?: ReactNode,
  isClosable?: boolean,
  options?: ToastOptions,
) =>
  baseToast('', {
    ...options,
    closeButton: props => (
      <Stack direction="row" gap={2}>
        <div> {icon}</div>
        <Stack direction="column">
          <Text as="div" variant="bodySmallStronger">
            {title}
          </Text>
          {typeof children === 'function' ? children(props) : children}
        </Stack>
        {isClosable ? closeButton(props) : null}
      </Stack>
    ),
  })

type NotificationContainerProps = {
  /**
   * Delay (in ms) before the notification autocloses. To disable autoclose, set to false
   */
  autoClose: false | number
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
   * Position on the notification container
   */
  position?: ToastOptions['position']
  'data-testid'?: string
}

export const NotificationContainer = ({
  newestOnTop,
  limit,
  autoClose = false,
  position = 'top-right',
  'data-testid': dataTestId,
}: NotificationContainerProps) => {
  const theme = useTheme()

  return (
    <>
      <Global styles={style} />
      <ClassNames>
        {({ css: localCss }) => (
          <BaseToastContainer
            data-testid={dataTestId}
            toastClassName={localCss(styles.toast({ theme }))}
            icon={false}
            autoClose={autoClose}
            newestOnTop={newestOnTop}
            limit={limit}
            position={position}
            css={css`
              top: 100px;
              right: calc(0% + ${theme.space['2']});
            `}
            stacked
            hideProgressBar
            draggable={false}
            transition={Slide}
          />
        )}
      </ClassNames>
    </>
  )
}

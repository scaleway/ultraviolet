'use client'

import type { Theme } from '@emotion/react'
import { ClassNames, css, useTheme } from '@emotion/react'
import { CloseIcon } from '@ultraviolet/icons'
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
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'

const PREFIX = '.Toastify'

type StylesProps = {
  theme: Theme
}

type CloseButtonProps = {
  closeToast: (event: React.MouseEvent<HTMLElement>) => void
  type: TypeOptions
  ariaLabel?: string
  theme: ThemeToastify
}

const styles = {
  toast: ({ theme }: StylesProps) => css`
    border-radius: ${theme.radii.default};

    &${PREFIX}__toast {
      background-color: ${theme.colors.other.elevation.background.raised};
      color: ${theme.colors.neutral.text};
      padding: ${theme.space['2']};
      box-shadow: ${theme.shadows.raised[0]}, ${theme.shadows.raised[1]};
    }

    &${PREFIX}__toast-container {
      width: 19.5rem;
    }

    ${PREFIX}__toast-body {
      margin: 0;
      padding: 0;
      display: none;
    }
  `,
}

const closeButton = (props: CloseButtonProps) => (
  <Button
    aria-label="close"
    sentiment="neutral"
    variant="ghost"
    onClick={props.closeToast}
    size="xsmall"
  >
    <CloseIcon />
  </Button>
)

export const notification = (
  children: ((props: CloseButtonProps) => ReactNode) | ReactNode,
  title: string,
  icon?: ReactNode,
  isClosable?: boolean,
  containerId?: string,
  options?: ToastOptions,
) =>
  baseToast('', {
    ...options,
    closeButton: props => (
      <Stack direction="row" gap={2}>
        <div>{icon}</div>
        <Stack direction="column">
          <Text as="h3" variant="bodySmallStronger">
            {title}
          </Text>
          {typeof children === 'function' ? children(props) : children}
        </Stack>
        {isClosable ? closeButton(props) : null}
      </Stack>
    ),
    containerId: containerId ?? 'notification',
  })

type NotificationContainerProps = {
  /**
   * Delay (in ms) before the notification autocloses. To disable autoclose, set to false
   */
  autoClose?: false | number
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
  className?: string
  /**
   * Give a personalized containerId in case there are multiple notifications with different styled to display
   */
  containerId?: string
}

export const NotificationContainer = ({
  newestOnTop,
  limit,
  autoClose = false,
  position = 'top-right',
  'data-testid': dataTestId,
  className,
  containerId = 'notification',
}: NotificationContainerProps) => {
  const theme = useTheme()

  return (
    <ClassNames>
      {/* eslint-disable-next-line @typescript-eslint/unbound-method */}
      {({ css: localCss }) => (
        <BaseToastContainer
          data-testid={dataTestId}
          toastClassName={localCss(styles.toast({ theme }))}
          icon={false}
          autoClose={autoClose}
          newestOnTop={newestOnTop}
          limit={limit}
          position={position}
          hideProgressBar
          draggable={false}
          transition={Slide}
          className={className}
          containerId={containerId}
        />
      )}
    </ClassNames>
  )
}

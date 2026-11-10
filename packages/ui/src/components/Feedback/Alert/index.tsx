'use client'

import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { CheckCircleIcon } from '@ultraviolet/icons/CheckCircleIcon'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { InformationIcon } from '@ultraviolet/icons/InformationIcon'
import { LightBulbIcon } from '@ultraviolet/icons/LightBulbIcon'
import { cn } from '@ultraviolet/utils'
import { useState } from 'react'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { Button } from '../../Action/Button'
import { Stack } from '../../Layout/Stack'
import { Text } from '../../Typography/Text'
import type { AlertSentiment } from './type'
import { alertStyle } from './styles.css'

const sentimentIcons = {
  danger: AlertCircleIcon,
  info: InformationIcon,
  neutral: LightBulbIcon,
  success: CheckCircleIcon,
  warning: AlertCircleIcon,
}

type AlertActionButtonProps = Pick<ComponentProps<typeof Button>, 'disabled' | 'sentiment' | 'size'>

type AlertRenderProps = {
  buttonProps: AlertActionButtonProps
}

type AlertProps = {
  /**
   * Alert message. Pass a function to render content with a Button using `buttonProps`.
   */
  children: ReactNode | ((props: AlertRenderProps) => ReactNode)
  /**
   * Add a title at the top of your alert.
   */
  title?: string
  sentiment?: AlertSentiment
  /**
   * Action displayed at the end of the alert, such as a `Button` or a `Link`.
   * Pass a function to render a Button with correct props using `buttonProps`.
   */
  action?: ReactNode | ((props: AlertRenderProps) => ReactNode)
  /**
   * @deprecated Use the `action` prop instead.
   */
  buttonText?: ComponentProps<typeof Button>['children']
  /**
   * @deprecated Use the `action` prop instead.
   */
  onClickButton?: () => void
  onClose?: () => void
  closable?: boolean
  className?: string
  'data-testid'?: string
  /**
   * Disabled the alert button.
   */
  disabled?: boolean
  style?: CSSProperties
  size?: 'medium' | 'small'
}

/**
 * Alert component is used to display a short, important message in a way that attracts the user's attention without interrupting the user's task.
 */
export const Alert = ({
  children,
  title,
  sentiment = 'danger',
  action,
  buttonText,
  onClickButton,
  closable,
  onClose,
  className,
  disabled,
  'data-testid': dataTestId,
  size = 'medium',
  style,
}: AlertProps) => {
  const [opened, setOpened] = useState(true)
  const Icon = sentimentIcons[sentiment]

  if (!opened) {
    return null
  }

  const buttonProps = {
    disabled,
    sentiment,
    size: 'small',
  } as const

  const actionContent =
    typeof action === 'function'
      ? action({ buttonProps })
      : (action ??
        (buttonText ? (
          <Button {...buttonProps} onClick={onClickButton}>
            {buttonText}
          </Button>
        ) : null))

  return (
    <Stack
      className={cn(className, alertStyle.alert({ sentiment, size }))}
      data-testid={dataTestId}
      direction="row"
      gap={1}
      style={style}
    >
      <Stack alignItems="center" className={alertStyle.wrap} direction="row" gap={2} wrap>
        <Stack alignItems="flex-start" direction="row" flex="1 1 0" gap={size === 'small' ? 1 : 2}>
          <Icon
            aria-hidden="true"
            className={alertStyle.icon}
            prominence={sentiment === 'neutral' ? 'strong' : undefined}
            sentiment={sentiment}
            size={size === 'small' ? 'small' : 'medium'}
          />
          <Stack className={alertStyle.text} direction="row" flex="1 1 auto" gap={size === 'small' ? 0.5 : 1} wrap>
            {title ? (
              <Text as="span" sentiment={sentiment} variant={size === 'small' ? 'bodySmallStronger' : 'bodyStronger'}>
                {title}
              </Text>
            ) : null}
            <Text as="div" variant={size === 'small' ? 'bodySmall' : 'body'}>
              {typeof children === 'function' ? children({ buttonProps }) : children}
            </Text>
          </Stack>
        </Stack>
        {actionContent ? <div className={alertStyle.action}>{actionContent}</div> : null}
      </Stack>
      {closable || onClose ? (
        <Button
          accessibleLabel="close"
          className={alertStyle.buttonClose}
          onClick={() => {
            setOpened(false)
            onClose?.()
          }}
          sentiment={sentiment}
          size="xsmall"
          variant="ghost"
        >
          <CloseIcon sentiment="neutral" />
        </Button>
      ) : null}
    </Stack>
  )
}

Alert.displayName = 'Alert'

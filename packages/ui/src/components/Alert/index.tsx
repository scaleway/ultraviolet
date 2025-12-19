'use client'

import {
  AlertCircleIcon,
  CheckCircleOutlineIcon,
  CloseIcon,
  InformationOutlineIcon,
  LightBulbIcon,
} from '@ultraviolet/icons'
import { cn } from '@ultraviolet/utils'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { useState } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import {
  alert,
  buttonAlert,
  buttonCloseAlert,
  smallIcon,
  textAlert,
  wrapAlert,
} from './styles.css'
import type { AlertSentiment } from './type'

const sentimentIcons = {
  danger: AlertCircleIcon,
  info: InformationOutlineIcon,
  neutral: LightBulbIcon,
  success: CheckCircleOutlineIcon,
  warning: AlertCircleIcon,
}

type AlertProps = {
  children: ReactNode
  /**
   * Add a title at the top of your alert.
   */
  title?: string
  sentiment?: AlertSentiment
  buttonText?: ComponentProps<typeof Button>['children']
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

  return (
    <Stack
      className={cn(className, alert({ sentiment, size }))}
      data-testid={dataTestId}
      direction="row"
      gap={1}
      style={style}
    >
      <Stack
        alignItems="center"
        className={wrapAlert}
        direction="row"
        gap={2}
        justifyContent="space-between"
        wrap
      >
        <Stack
          alignItems="start"
          direction="row"
          flex="1 1 auto"
          gap={size === 'small' ? 1 : 2}
        >
          <Icon
            aria-hidden="true"
            className={size === 'small' ? smallIcon : ''}
            prominence={sentiment === 'neutral' ? 'strong' : undefined}
            sentiment={sentiment}
            size={size === 'small' ? 'small' : 'large'}
          />
          <Stack
            alignItems="center"
            className={textAlert}
            direction="row"
            flex="1 1 auto"
            gap={1.5}
            wrap
          >
            {title ? (
              <Text
                as="span"
                sentiment={sentiment}
                variant={
                  size === 'small' ? 'bodySmallStronger' : 'bodyStronger'
                }
              >
                {title}
              </Text>
            ) : null}
            {typeof children === 'string' ? (
              <Text as="p" variant={size === 'small' ? 'bodySmall' : 'body'}>
                {children}
              </Text>
            ) : (
              children
            )}
          </Stack>
        </Stack>
        {buttonText ? (
          <Button
            className={buttonAlert[size]}
            disabled={disabled}
            onClick={onClickButton}
            sentiment={sentiment}
            size="small"
          >
            {buttonText}
          </Button>
        ) : null}
      </Stack>
      {closable || onClose ? (
        <Button
          aria-label="close"
          className={buttonCloseAlert}
          onClick={() => {
            setOpened(false)
            onClose?.()
          }}
          sentiment="neutral"
          size="small"
          variant="ghost"
        >
          <CloseIcon />
        </Button>
      ) : null}
    </Stack>
  )
}

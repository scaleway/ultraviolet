'use client'

import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { CheckCircleIcon } from '@ultraviolet/icons/CheckCircleIcon'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { InformationIcon } from '@ultraviolet/icons/InformationIcon'
import { LightBulbIcon } from '@ultraviolet/icons/LightBulbIcon'
import { cn } from '@ultraviolet/utils'
import { useState } from 'react'

import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'

import { alertStyle } from './styles.css'

import type { AlertSentiment } from './type'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'

const sentimentIcons = {
  danger: AlertCircleIcon,
  info: InformationIcon,
  neutral: LightBulbIcon,
  success: CheckCircleIcon,
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
      className={cn(className, alertStyle.alert({ sentiment, size }))}
      data-testid={dataTestId}
      direction="row"
      gap={1}
      style={style}
    >
      <Stack
        alignItems="center"
        className={alertStyle.wrap}
        direction="row"
        gap={2}
        justifyContent="space-between"
        wrap
      >
        <Stack
          alignItems="flex-start"
          direction="row"
          flex="1 1 auto"
          gap={size === 'small' ? 1 : 2}
        >
          <Icon
            aria-hidden="true"
            className={size === 'small' ? alertStyle.smallIcon : ''}
            prominence={sentiment === 'neutral' ? 'strong' : undefined}
            sentiment={sentiment}
            size={size === 'small' ? 'small' : 'large'}
          />
          <Stack
            alignItems="center"
            className={alertStyle.text}
            direction="row"
            flex="1 1 auto"
            gap={size === 'small' ? 0.5 : 1}
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
            className={alertStyle.button[size]}
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
          className={alertStyle.buttonClose}
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

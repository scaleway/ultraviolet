'use client'

import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { CheckCircleIcon } from '@ultraviolet/icons/CheckCircleIcon'
import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { InformationIcon } from '@ultraviolet/icons/InformationIcon'
import { LightBulbIcon } from '@ultraviolet/icons/LightBulbIcon'
import { cn } from '@ultraviolet/utils'
import { useEffect, useId, useRef, useState } from 'react'
import type { ComponentProps, CSSProperties, ReactNode, RefObject } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import type { AlertSentiment } from './type'
import { alertStyle } from './styles.css'

const sentimentIcons = {
  danger: AlertCircleIcon,
  info: InformationIcon,
  neutral: LightBulbIcon,
  success: CheckCircleIcon,
  warning: AlertCircleIcon,
}

// `danger` and `warning` are assertive and interrupt the user, other sentiments are polite status updates.
const sentimentRole: Record<AlertSentiment, 'alert' | 'status'> = {
  danger: 'alert',
  info: 'status',
  neutral: 'status',
  success: 'status',
  warning: 'alert',
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
  /**
   * Element to move focus to when the alert is dismissed. When not provided,
   * focus is restored to the element that had focus before the close button.
   */
  focusAfterClose?: RefObject<HTMLElement | null>
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
  focusAfterClose,
}: AlertProps) => {
  const [opened, setOpened] = useState(true)
  const Icon = sentimentIcons[sentiment]
  const titleId = useId()
  const closeButtonRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const showClose = closable || onClose

  useEffect(() => {
    const node = closeButtonRef.current
    const handleFocus = (event: FocusEvent) => {
      const related = event.relatedTarget

      previousFocusRef.current = related instanceof HTMLElement && document.contains(related) ? related : null
    }
    if (node) {
      node.addEventListener('focus', handleFocus)
    }

    return () => {
      if (node) {
        node.removeEventListener('focus', handleFocus)
      }
    }
  }, [showClose])

  if (!opened) {
    return null
  }

  const handleClose = () => {
    const fallback = focusAfterClose?.current ?? previousFocusRef.current

    if (fallback && document.contains(fallback)) {
      fallback.focus()
    }
    setOpened(false)
    onClose?.()
  }

  return (
    <Stack
      aria-labelledby={title ? titleId : undefined}
      className={cn(className, alertStyle.alert({ sentiment, size }))}
      data-testid={dataTestId}
      direction="row"
      gap={1}
      role={sentimentRole[sentiment]}
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
        <Stack alignItems="flex-start" direction="row" flex="1 1 auto" gap={size === 'small' ? 1 : 2}>
          <Icon
            aria-hidden="true"
            className={alertStyle.icon}
            prominence={sentiment === 'neutral' ? 'strong' : undefined}
            sentiment={sentiment}
            size={size === 'small' ? 'small' : 'medium'}
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
                id={titleId}
                sentiment={sentiment}
                variant={size === 'small' ? 'bodySmallStronger' : 'bodyStronger'}
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
      {showClose ? (
        <Button
          aria-label={title ? `Close ${title} alert` : 'close'}
          className={alertStyle.buttonClose}
          onClick={handleClose}
          ref={closeButtonRef}
          sentiment={sentiment}
          size="xsmall"
          variant="ghost"
        >
          <CloseIcon aria-hidden="true" sentiment="neutral" />
        </Button>
      ) : null}
    </Stack>
  )
}

'use client'

import type { SerializedStyles, Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  AlertCircleIcon,
  CheckCircleOutlineIcon,
  CloseIcon,
  InformationOutlineIcon,
  LightBulbIcon,
} from '@ultraviolet/icons'
import type { ComponentProps, ReactNode } from 'react'
import { useState } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'

export const ALERT_SENTIMENTS = [
  'danger',
  'info',
  'success',
  'warning',
  'neutral',
] as const
type AlertSentiment = (typeof ALERT_SENTIMENTS)[number]

const alertStyles = ({
  theme,
  sentiment,
}: {
  theme: Theme
  sentiment: AlertSentiment
}): SerializedStyles => {
  if (sentiment === 'neutral') {
    return css`
        background-color: ${theme.colors.neutral.backgroundWeak};
        color: ${theme.colors.neutral.text};
        border-left: 4px solid ${theme.colors.neutral.borderStronger};
      `
  }

  const sentimentColor = theme.colors[sentiment]

  return css`
    background-color: ${sentimentColor.background};
    color: ${sentimentColor.text};
    border-left: 4px solid ${sentimentColor.border};
  `
}

const sentimentIcons = {
  danger: AlertCircleIcon,
  info: InformationOutlineIcon,
  neutral: LightBulbIcon,
  success: CheckCircleOutlineIcon,
  warning: AlertCircleIcon,
}

const StyledStackContainer = styled(Stack, {
  shouldForwardProp: prop => !['sentiment'].includes(prop),
})<{ sentiment: AlertSentiment }>`
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => theme.space['2']};
  ${alertStyles};
`

const TextStack = styled(Stack)`
  color: ${({ theme }) => theme.colors.neutral.text};
  flex-wrap: wrap;
`

const WrapStack = styled(Stack)`
  flex-wrap: wrap;
  width: 100%;
`

const StyledButton = styled(Button)`
  margin-left: ${({ theme }) => theme.space['5']};
`

const CloseButton = styled(Button)`
  align-self: start;
`

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
}: AlertProps) => {
  const [opened, setOpened] = useState(true)
  const Icon = sentimentIcons[sentiment]

  if (!opened) return null

  return (
    <StyledStackContainer
      className={className}
      data-testid={dataTestId}
      direction="row"
      gap={1}
      sentiment={sentiment}
    >
      <WrapStack
        alignItems="center"
        direction="row"
        gap={2}
        justifyContent="space-between"
      >
        <Stack alignItems="start" direction="row" flex="1 1 auto" gap={2}>
          <Icon
            aria-hidden="true"
            prominence={sentiment === 'neutral' ? 'strong' : undefined}
            sentiment={sentiment}
            size="large"
          />
          <TextStack direction="row" flex="1 1 auto" gap={1.5}>
            {title ? (
              <Text as="span" sentiment={sentiment} variant="bodyStronger">
                {title}
              </Text>
            ) : null}
            {typeof children === 'string' ? (
              <Text as="p" variant="body">
                {children}
              </Text>
            ) : (
              children
            )}
          </TextStack>
        </Stack>
        {buttonText ? (
          <StyledButton
            disabled={disabled}
            onClick={onClickButton}
            sentiment={sentiment}
            size="small"
          >
            {buttonText}
          </StyledButton>
        ) : null}
      </WrapStack>
      {closable || onClose ? (
        <CloseButton
          aria-label="close"
          onClick={() => {
            setOpened(false)
            onClose?.()
          }}
          sentiment="neutral"
          size="small"
          variant="ghost"
        >
          <CloseIcon />
        </CloseButton>
      ) : null}
    </StyledStackContainer>
  )
}

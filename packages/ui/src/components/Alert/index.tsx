import type { SerializedStyles, Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
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
] as const
type AlertSentiment = (typeof ALERT_SENTIMENTS)[number]

const alertStyles = ({
  theme,
  sentiment,
}: {
  theme: Theme
  sentiment: AlertSentiment
}): SerializedStyles => {
  const sentimentColor = theme.colors[sentiment]

  return css`
    background-color: ${sentimentColor.background};
    color: ${sentimentColor.text};
    border-left: 4px solid ${sentimentColor.border};
  `
}

const typesDefaultIcons: Record<
  AlertSentiment,
  ComponentProps<typeof Icon>['name']
> = {
  warning: 'alert',
  info: 'information-outline',
  success: 'checkbox-circle-outline',
  danger: 'alert',
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

  if (!opened) return null

  return (
    <StyledStackContainer
      gap={1}
      direction="row"
      sentiment={sentiment}
      className={className}
      data-testid={dataTestId}
    >
      <WrapStack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Stack alignItems="start" direction="row" gap={2}>
          <Icon
            name={typesDefaultIcons[sentiment]}
            size={24}
            aria-hidden="true"
          />
          <TextStack gap={0.5} direction="row">
            {title ? (
              <Text variant="bodyStronger" as="span" color={sentiment}>
                {title}
              </Text>
            ) : null}
            {typeof children === 'string' ? (
              <Text variant="body" as="p">
                {children}
              </Text>
            ) : (
              children
            )}
          </TextStack>
        </Stack>
        {buttonText ? (
          <StyledButton
            sentiment={sentiment}
            onClick={onClickButton}
            size="small"
            disabled={disabled}
          >
            {buttonText}
          </StyledButton>
        ) : null}
      </WrapStack>
      {closable || onClose ? (
        <CloseButton
          variant="ghost"
          size="small"
          onClick={() => {
            setOpened(false)
            onClose?.()
          }}
          icon="close"
          sentiment="neutral"
          aria-label="close"
        />
      ) : null}
    </StyledStackContainer>
  )
}

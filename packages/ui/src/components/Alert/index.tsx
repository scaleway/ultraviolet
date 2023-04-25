import type { SerializedStyles, Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { useState } from 'react'
import { ButtonV2 } from '../ButtonV2'
import { Icon } from '../Icon'
import { Stack } from '../Stack'
import { Text } from '../Text'

type AlertType = 'danger' | 'info' | 'success' | 'warning'

const alertStyles = ({
  theme,
  variant,
}: {
  theme: Theme
  variant: AlertType
}): SerializedStyles => {
  const sentiment = theme.colors[variant]

  return css`
    background-color: ${sentiment.background};
    color: ${sentiment.text};
    border-left: 4px solid ${sentiment.borderWeak};
  `
}

const typesDefaultIcons: Record<
  AlertType,
  ComponentProps<typeof Icon>['name']
> = {
  warning: 'alert',
  info: 'information-outline',
  success: 'checkbox-circle-outline',
  danger: 'alert',
}

const StyledStackContainer = styled(Stack, {
  shouldForwardProp: prop => !['variant'].includes(prop),
})<{ variant: AlertType }>`
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

const StyledButton = styled(ButtonV2)`
  margin-left: ${({ theme }) => theme.space['5']};
`

const CloseButton = styled(ButtonV2)`
  align-self: start;
`

type AlertProps = {
  children: ReactNode
  /**
   * Add a title at the top of your alert.
   */
  title?: string
  variant?: AlertType
  buttonText?: ComponentProps<typeof ButtonV2>['children']
  onClickButton?: () => void
  onClose?: () => void
  isClosable?: boolean
  className?: string
  'data-testid'?: string
}

export const Alert = ({
  children,
  title,
  variant = 'danger',
  buttonText,
  onClickButton,
  isClosable,
  onClose,
  className,
  'data-testid': dataTestId,
}: AlertProps) => {
  const [opened, setOpened] = useState(true)

  if (!opened) return null

  return (
    <StyledStackContainer
      gap={1}
      direction="row"
      variant={variant}
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
            name={typesDefaultIcons[variant]}
            size={24}
            aria-hidden="true"
          />
          <TextStack gap={0.5} direction="row">
            {title ? (
              <Text variant="bodyStronger" as="span" color={variant}>
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
            sentiment={variant}
            onClick={onClickButton}
            size="small"
          >
            {buttonText}
          </StyledButton>
        ) : null}
      </WrapStack>
      {isClosable ? (
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

import type { SerializedStyles, Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { Icon } from '../Icon'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { ButtonV2 } from '../ButtonV2'

type AlertType = 'danger' | 'info' | 'success' | 'warning'

const alertStyles = ({
  theme,
  variant,
}: {
  theme: Theme
  variant: AlertType
}): SerializedStyles => {
  const sentiment = theme.colors[variant] || theme.colors.danger

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
  flex-wrap: wrap;
`

const StyledStack = styled(Stack)`
  color: ${({ theme }) => theme.colors.neutral.text};
  flex-wrap: wrap;
`

type AlertProps = {
  children: ReactNode
  /**
   * Add a title at the top of your alert.
   */
  title?: string
  variant?: AlertType
  buttonText?: string
  onButtonClick?: () => void
  isClosable?: boolean
  className?: string
  'data-testid'?: string
}

export const Alert = ({
  children,
  title,
  variant = 'danger',
  buttonText,
  onButtonClick,
  isClosable,
  className,
  'data-testid': dataTestId,
}: AlertProps) => (
  <StyledStackContainer
    gap={2}
    direction="row"
    alignItems="center"
    variant={variant}
    className={className}
    data-testid={dataTestId}
    justifyContent="space-between"
  >
    <Stack alignItems="start" direction="row" gap={2}>
      <Icon name={typesDefaultIcons[variant]} size={24} aria-hidden="true" />
      <StyledStack gap={0.5} direction="row">
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
      </StyledStack>
    </Stack>
    {buttonText || isClosable ? (
      <Stack direction="row" gap={1}>
        {buttonText ? (
          <ButtonV2 sentiment={variant} onClick={onButtonClick} size="small">
            {buttonText}
          </ButtonV2>
        ) : null}
      </Stack>
    ) : null}
  </StyledStackContainer>
)

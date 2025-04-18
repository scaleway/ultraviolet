'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useReducer } from 'react'
import { Button } from '../Button'
import { SIZE_HEIGHT } from '../Button/constants'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { GlobalAlertLink } from './GlobalAlertLink'

const CloseButton = styled(Button)`
  background: none;
  position: absolute;
  right: ${({ theme }) => theme.sizing[SIZE_HEIGHT.large]};

  &:hover,
  &:focus,
  &:active {
    background: none;
  }
`

const Container = styled(Stack)`
  width: 100%;
  height: ${({ theme }) => theme.sizing['700']};
  padding: 0 ${({ theme }) => theme.space['2']};

  &[data-variant='info'] {
    background-color: ${({ theme }) => theme.colors.info.backgroundStrong};
  }

  &[data-variant='danger'] {
    background-color: ${({ theme }) => theme.colors.danger.backgroundStrong};
  }

  &[data-variant='promotional'] {
    background: ${({ theme }) =>
      theme.colors.other.gradients.background.linear.aqua};
  }
`

type GlobalAlertProps = {
  children: ReactNode
  variant?: 'info' | 'danger' | 'promotional'
  onClose?: () => void
  closable?: boolean
  className?: string
  'data-testid'?: string
  buttonText?: string
  onClickButton?: () => void
}

/**
 * GlobalAlert is a component that is used to display a global alert message.
 * It has its own internal state and can be closed by clicking on the close button.
 */
export const GlobalAlert = ({
  children,
  variant = 'info',
  onClose,
  closable = true,
  buttonText,
  onClickButton,
  className,
  'data-testid': dataTestId,
}: GlobalAlertProps) => {
  const [opened, toggleOpened] = useReducer(value => !value, true)

  if (!opened) return null

  return (
    <Container
      justifyContent="center"
      alignItems="center"
      direction="row"
      data-variant={variant}
      data-testid={dataTestId}
      className={className}
    >
      <Stack
        gap={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Text variant="bodySmall" as="p" sentiment="white">
          {children}
        </Text>
        {onClickButton && buttonText ? (
          <Button
            onClick={onClickButton}
            variant="filled"
            sentiment="white"
            size="small"
          >
            {buttonText}
          </Button>
        ) : null}
      </Stack>
      {closable ? (
        <CloseButton
          variant="filled"
          size="xsmall"
          icon="close"
          sentiment="primary"
          onClick={() => {
            toggleOpened()
            onClose?.()
          }}
        />
      ) : null}
    </Container>
  )
}

GlobalAlert.Link = GlobalAlertLink

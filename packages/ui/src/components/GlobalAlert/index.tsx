'use client'

import { CloseIcon } from '@ultraviolet/icons'
import { cn } from '@ultraviolet/themes'
import type { CSSProperties, ReactNode } from 'react'
import { useReducer } from 'react'
import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { GlobalAlertLink } from './GlobalAlertLink'
import { closeButton, container } from './styles.css'

type GlobalAlertProps = {
  children: ReactNode
  variant?: 'info' | 'danger' | 'promotional'
  onClose?: () => void
  closable?: boolean
  className?: string
  'data-testid'?: string
  buttonText?: string
  onClickButton?: () => void
  style?: CSSProperties
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
  style,
}: GlobalAlertProps) => {
  const [opened, toggleOpened] = useReducer(value => !value, true)

  if (!opened) {
    return null
  }

  return (
    <Stack
      alignItems="center"
      className={cn(className, container[variant])}
      data-testid={dataTestId}
      data-variant={variant}
      direction="row"
      justifyContent="center"
      style={style}
    >
      <Stack
        alignItems="center"
        direction="row"
        gap={2}
        justifyContent="center"
      >
        <Text as="p" sentiment="white" variant="bodySmall">
          {children}
        </Text>
        {onClickButton && buttonText ? (
          <Button
            onClick={onClickButton}
            sentiment="white"
            size="small"
            variant="filled"
          >
            {buttonText}
          </Button>
        ) : null}
      </Stack>
      {closable ? (
        <Button
          className={closeButton}
          onClick={() => {
            toggleOpened()
            onClose?.()
          }}
          sentiment="primary"
          size="xsmall"
          variant="filled"
        >
          <CloseIcon />
        </Button>
      ) : null}
    </Stack>
  )
}

GlobalAlert.Link = GlobalAlertLink

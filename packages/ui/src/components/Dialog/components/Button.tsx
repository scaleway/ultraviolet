'use client'

import type { ComponentProps, ReactNode } from 'react'
import { Button } from '../../Button'
import { useDialogContext } from '../Context'

type DialogButtonProps = {
  children: ReactNode
} & Pick<ComponentProps<typeof Button>, 'onClick' | 'disabled' | 'tooltip'>

export const DialogButton = ({
  children,
  onClick,
  disabled,
  tooltip,
}: DialogButtonProps) => {
  const context = useDialogContext()

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sentiment={context.sentiment}
      tooltip={tooltip}
    >
      {children}
    </Button>
  )
}

'use client'

import type { ComponentProps, ReactNode } from 'react'
import { Button } from '../../Button'
import { useDialogContext } from '../Context'

type DialogButtonProps = {
  children: ReactNode
} & Pick<
  ComponentProps<typeof Button>,
  'onClick' | 'disabled' | 'tooltip' | 'style'
>

export const DialogButton = ({
  children,
  onClick,
  disabled,
  tooltip,
  style,
}: DialogButtonProps) => {
  const context = useDialogContext()

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sentiment={context.sentiment}
      style={style}
      tooltip={tooltip}
    >
      {children}
    </Button>
  )
}

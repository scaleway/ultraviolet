'use client'

import type { ComponentProps, MouseEvent, ReactNode } from 'react'
import { Button } from '../../Button'
import { useDialogContext } from '../Context'

type DialogButtonProps = {
  children: ReactNode
} & Pick<ComponentProps<typeof Button>, 'onClick' | 'disabled' | 'tooltip' | 'tooltipDescription' | 'style'>

export const DialogButton = ({
  children,
  onClick,
  disabled,
  tooltip,
  tooltipDescription,
  style,
}: DialogButtonProps) => {
  const context = useDialogContext()

  function onButtonClick(e: MouseEvent<HTMLElement>) {
    const dialog = (e.target as HTMLElement).closest('dialog')
    if (dialog) {
      dialog.dataset['closeAction'] = 'confirm'
    }
    onClick?.(e)
  }

  return (
    <Button
      disabled={disabled}
      onClick={onButtonClick}
      sentiment={context.sentiment}
      style={style}
      tooltip={tooltip}
      tooltipDescription={tooltipDescription}
    >
      {children}
    </Button>
  )
}

DialogButton.displayName = 'Dialog.Button'

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
      sentiment={context.sentiment}
      onClick={onClick}
      disabled={disabled}
      tooltip={tooltip}
    >
      {children}
    </Button>
  )
}

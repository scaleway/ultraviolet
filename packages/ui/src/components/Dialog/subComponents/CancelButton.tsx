import type { ComponentProps, ReactNode } from 'react'
import { Button } from '../../Button'

type DialogCancelButtonProps = {
  children: ReactNode
  onClick: ComponentProps<typeof Button>['onClick']
}

export const DialogCancelButton = ({
  children,
  onClick,
}: DialogCancelButtonProps) => (
  <Button variant="outlined" sentiment="neutral" onClick={onClick}>
    {children}
  </Button>
)

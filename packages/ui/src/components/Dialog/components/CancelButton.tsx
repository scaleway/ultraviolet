'use client'

import type { ComponentProps, ReactNode } from 'react'
import { Button } from '../../Button'

type DialogCancelButtonProps = {
  children: ReactNode
  onClick: ComponentProps<typeof Button>['onClick']
  disabled?: ComponentProps<typeof Button>['disabled']
}

export const DialogCancelButton = ({
  children,
  onClick,
  disabled,
}: DialogCancelButtonProps) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    sentiment="neutral"
    variant="outlined"
  >
    {children}
  </Button>
)

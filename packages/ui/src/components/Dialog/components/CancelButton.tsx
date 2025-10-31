'use client'

import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { Button } from '../../Button'

type DialogCancelButtonProps = {
  children: ReactNode
  onClick: ComponentProps<typeof Button>['onClick']
  disabled?: ComponentProps<typeof Button>['disabled']
  style?: CSSProperties
}

export const DialogCancelButton = ({
  children,
  onClick,
  disabled,
  style,
}: DialogCancelButtonProps) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    sentiment="neutral"
    style={style}
    variant="outlined"
  >
    {children}
  </Button>
)

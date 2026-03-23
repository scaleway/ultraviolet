'use client'

import { Button } from '../../Button'

import type { ComponentProps, CSSProperties, ReactNode } from 'react'

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

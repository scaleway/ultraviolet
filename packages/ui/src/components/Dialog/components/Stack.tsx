'use client'

import type { CSSProperties, ReactNode } from 'react'
import { Stack } from '../../Stack'

type DialogStackProps = {
  children: ReactNode
  style?: CSSProperties
}

export const DialogStack = ({ children, style }: DialogStackProps) => (
  <Stack gap={3} style={style}>
    {children}
  </Stack>
)

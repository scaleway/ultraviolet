'use client'

import { Stack } from '../../Stack'

import type { CSSProperties, ReactNode } from 'react'

type DialogStackProps = {
  children: ReactNode
  style?: CSSProperties
}

export const DialogStack = ({ children, style }: DialogStackProps) => (
  <Stack gap={3} style={style}>
    {children}
  </Stack>
)

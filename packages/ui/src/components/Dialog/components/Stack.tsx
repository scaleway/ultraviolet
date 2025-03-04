import type { ReactNode } from 'react'
import { Stack } from '../../Stack'

type DialogStackProps = {
  children: ReactNode
}

export const DialogStack = ({ children }: DialogStackProps) => (
  <Stack gap={3}>{children}</Stack>
)

import type { ReactNode } from 'react'
import { Stack } from '../../Stack'

type DialogButtonsProps = {
  secondaryButton: ReactNode
  primaryButton: ReactNode
}

export const DialogButtons = ({
  secondaryButton,
  primaryButton,
}: DialogButtonsProps) => (
  <Stack direction="row" gap={2} justifyContent="end">
    {secondaryButton}
    {primaryButton}
  </Stack>
)

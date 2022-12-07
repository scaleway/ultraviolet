import { ReactNode } from 'react'
import Stack from '../Stack'

type ListBodyProps = {
  children: ReactNode
  className?: string
}

export const ListBody = ({ children, className }: ListBodyProps) => (
  <Stack gap={2} role="rowgroup" className={className}>
    {children}
  </Stack>
)

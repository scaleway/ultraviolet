import type { ReactNode } from 'react'

type ListHeadersProps = {
  children: ReactNode
  className?: string
}

export const ListHeaders = ({ children, className }: ListHeadersProps) => (
  <div role="rowgroup" className={className}>
    {children}
  </div>
)

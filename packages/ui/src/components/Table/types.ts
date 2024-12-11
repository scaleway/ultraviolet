import type { ComponentProps, ReactNode } from 'react'
import type { HeaderCell } from './HeaderCell'

export type ColumnProps = Pick<
  ComponentProps<typeof HeaderCell>,
  'isOrdered' | 'onOrder' | 'orderDirection'
> & {
  label?: ReactNode
  width?: string
  minWidth?: string
  maxWidth?: string
  info?: string
  align?: 'left' | 'center' | 'right'
}

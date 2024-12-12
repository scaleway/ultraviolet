import type { ComponentProps } from 'react'
import type { HeaderCell } from './HeaderCell'

export type ColumnProps = Pick<
  ComponentProps<typeof HeaderCell>,
  'isOrdered' | 'onOrder' | 'orderDirection'
> & {
  label?: string
  width?: string
  minWidth?: string
  maxWidth?: string
  info?: string
}

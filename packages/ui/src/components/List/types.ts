import type { HeaderCell } from './HeaderCell'
import type { ComponentProps } from 'react'

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

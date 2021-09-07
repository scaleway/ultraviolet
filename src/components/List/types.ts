import { Theme } from '@emotion/react'
import { Interpolation } from '@emotion/serialize'
import { MouseEventHandler, ReactNode } from 'react'

export type ListOrder = 'asc' | 'desc' | undefined

export type ListSort = {
  index: number
  onSort?:
    | ((
        prop: string | ((item: unknown) => string) | null,
        order: string,
      ) => (a: Record<string, unknown>, b: Record<string, unknown>) => number)
    | null
  order: ListOrder
  prop: string | ((item: unknown) => string) | undefined
}

export type ListColumn = {
  alignItems?: string | null
  justifyContent?: string | null
  label?: string | null
  onSort?:
    | ((
        prop: string | ((item: unknown) => string) | null,
        order: string,
      ) => (a: Record<string, unknown>, b: Record<string, unknown>) => number)
    | null
  padding?: string | null
  sort?: string | ((item: unknown) => string) | null
  width?: string | null
  defaultSort?: ListOrder | null
}

export type ListRowState = {
  selected?: boolean
  opened?: boolean
  highlighted?: boolean
  forceOpened?: boolean
}

export type ListRowProps = {
  id: string
  tooltip?: string
  children: ReactNode
  animated?: boolean
  edition?: boolean
  isEditable?: boolean
  isHoverable?: boolean
  locked?: boolean
  alert?: boolean
  customStyle?: Interpolation<Theme>
  open?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLDivElement | HTMLDetailsElement>
}

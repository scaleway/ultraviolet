import { MouseEventHandler, ReactNode } from 'react'

export type ListOrder = 'asc' | 'desc' | undefined

export type ListSort<T> = {
  index: number
  onSort?:
    | ((
        prop: string | ((item: T) => string) | null,
        order: string,
      ) => (a: T, b: T) => number)
    | null
  order: ListOrder
  prop: string | ((item: T) => string) | undefined
}

export type ListColumn<T> = {
  alignItems?: string | null
  justifyContent?: string | null
  label?: string | null
  onSort?:
    | ((
        prop: string | ((item: T) => string) | null,
        order: string,
      ) => (a: T, b: T) => number)
    | null
  padding?: string | null
  sort?: string | ((item: T) => string) | null
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
  customStyle?: JSX.IntrinsicAttributes['css']
  open?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLDivElement | HTMLDetailsElement>
}

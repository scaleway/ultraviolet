import { MouseEventHandler, ReactNode } from 'react'
import * as animations from '../../utils/animations'

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
  disabled?: boolean
}

export type ListRowProps = {
  id: string
  tooltip?: string
  children: ReactNode
  animated?: boolean
  animation?: keyof typeof animations
  animationDuration?: number
  edition?: boolean
  expandableClassName?: string
  isEditable?: boolean
  isHoverable?: boolean
  locked?: boolean
  alert?: boolean
  customStyle?: JSX.IntrinsicAttributes['css']
  open?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLDivElement | HTMLDetailsElement>
}

export type ExpandedContentProps = {
  id?: string
  rowsState?: { [x: string]: ListRowState }
  children?:
    | ReactNode
    | ((props: { id?: string; isToggled: boolean }) => JSX.Element)
}

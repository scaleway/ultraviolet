import type { ReactNode } from 'react'

export type OptionType = {
  value: string
  disabled?: boolean
  description?: ReactNode
  optionalInfo?: ReactNode
  tooltip?: string
} & (
  | { label: string; searchText?: string }
  | {
      label: ReactNode
      searchText: string
    }
)

export type DataType = Record<string, OptionType[]> | OptionType[]

export type ReducerState = {
  selectedValues: string[]
  allSelected: boolean
  selectedGroups: string[]
}

export type ReducerAction =
  | { type: 'selectAll' }
  | { type: 'selectGroup'; selectedGroup: string }
  | {
      type: 'selectOption'
      clickedOption: OptionType
      group?: string
    }
  | { type: 'clearAll' }
  | { type: 'update' }
  | {
      type: 'reset'
      selectedValues: ReducerState['selectedValues']
      selectedGroups: ReducerState['selectedGroups']
    }

export const INPUT_SIZE_HEIGHT = {
  large: 48,
  medium: 40,
  small: 32,
} as const

export const SIZES_TAG = {
  letterWidth: 5,
  tagWidth: 72,
} as const

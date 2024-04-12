import type { ReactNode } from 'react'

export type OptionType = {
  value: string
  label: ReactNode
  disabled: boolean
  description?: string
  optionalInfo?: ReactNode
  searchText?: string
}

export type DataType = Record<string, OptionType[]> | OptionType[]

export const INPUT_SIZE_HEIGHT = {
  large: 48,
  medium: 40,
  small: 32,
} as const

export const SIZES_TAG = {
  letterWidth: 5,
  tagWidth: 72,
} as const

import type { SelectInput } from '@ultraviolet/ui'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'

export type SelectorOption = {
  content: ReactNode
  icon?: ReactNode
  value: string
  hoverContent?: ReactNode
  disabled?: boolean
  tooltip?: string
  optionalInfo?: ReactNode
}

export type SelectorProps = {
  label: string
  labelDescription?: ReactNode
  options: SelectorOption[]
  value?: string
  onChange?: ComponentProps<typeof SelectInput>['onChange']
  error?: boolean | string
  disabled?: boolean
  helper?: string
  readOnly?: boolean
  placeholder?: string
}

export type OptionSelectorProps = {
  className?: string
  'data-testid'?: string
  style?: CSSProperties
  firstSelector: SelectorProps
  secondSelector?: SelectorProps
  size?: ComponentProps<typeof SelectInput>['size']
  disabled?: boolean
  readOnly?: boolean
}

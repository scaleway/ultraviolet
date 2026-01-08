import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import type { SelectInput } from '../../SelectInput'

export type SelectorOption = {
  content: ReactNode
  icon?: ReactNode
  value: string
  hoverContent?: ReactNode
  disabled?: boolean
  tooltip?: string
  optionalInfo?: ReactNode
}

export type SelectorProps = Pick<
  ComponentProps<typeof SelectInput>,
  | 'label'
  | 'labelDescription'
  | 'error'
  | 'disabled'
  | 'helper'
  | 'readOnly'
  | 'placeholder'
> & { options: SelectorOption[] }

export type OptionSelectorProps = {
  className?: string
  'data-testid'?: string
  style?: CSSProperties
  firstSelector: SelectorProps
  secondSelector?: SelectorProps
  size?: ComponentProps<typeof SelectInput>['size']
  disabled?: boolean
  readOnly?: boolean
  name?: string
  'aria-label'?: string
  error?: string | boolean
  required?: boolean
  onChange?: (values: { first?: string; second?: string }) => void
  value?: { first?: string; second?: string }
}

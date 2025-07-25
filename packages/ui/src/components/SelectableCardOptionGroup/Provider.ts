import type { ComponentProps, InputHTMLAttributes } from 'react'
import { createContext, useContext } from 'react'
import type { SelectInput } from '../SelectInput'
import type { Sizes } from './types'

type SelectableCardOptionGroupContextType = {
  groupName?: string
  groupValue?: string
  error: boolean
  onChangeOption: (value: string) => void
  disabled?: boolean
  size: Sizes
  optionValue?: ComponentProps<typeof SelectInput>['value']
} & Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'onChange'>> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>

export const SelectableCardOptionGroupContext =
  createContext<SelectableCardOptionGroupContextType>({
    groupName: '',
    onChange: () => {},
    onChangeOption: () => {},
    required: false,
    error: false,
    disabled: false,
    size: 'large',
    optionValue: '',
  })

export const useSelectableCardOptionGroup = () => {
  const context = useContext(SelectableCardOptionGroupContext)

  if (!context) {
    throw new Error(
      'SelectableCardOptionGroup.Option must be used inside a SelectableCardOptionGroup',
    )
  }

  return context
}

import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { KeyValueInput } from '..'
import { KeyValuePair } from '../types'

const keyOptions = [
  { value: 'key-1', label: 'First key' },
  { value: 'key-2', label: 'Second key' },
  { value: 'key-3', label: 'Third key' },
  { value: 'disabled', label: 'Disabled key', disabled: true },
]
const valueOption = [
  { value: 'value-1', label: 'First value' },
  { value: 'value-2', label: 'Second value' },
  { value: 'value-3', label: 'Third value' },
  { value: 'disabled', label: 'Disabled value', disabled: true },
]

export const WithSelectInput: StoryFn<typeof KeyValueInput> = args => {
  const [keyValues, setKeyValues] = useState<KeyValuePair[]>([])

  return <KeyValueInput {...args} keyvalues={keyValues} onChange={setKeyValues} />
}

WithSelectInput.args = {
  addButton: {
    maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
    name: 'Add key-value',
    tooltip: 'This is a tooltip',
  },
  inputKey: {
    inputType: 'select',
    options: keyOptions,
    label: 'Key',
    required: true,
  },
  inputValue: {
    inputType: 'select',
    options: valueOption,
    label: 'Value',
    required: false,
  },
  name: 'keyValues',
  size: 'large',
  disabled: false,
  readOnly: false,
}

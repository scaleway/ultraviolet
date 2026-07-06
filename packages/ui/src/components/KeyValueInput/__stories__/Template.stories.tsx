import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { KeyValueInput } from '..'
import { KeyValuePair } from '../types'

export const Template: StoryFn<typeof KeyValueInput> = args => {
  const [keyValues, setKeyValues] = useState<KeyValuePair[]>([])

  return (
    <KeyValueInput
      {...args}
      keyvalues={keyValues}
      onChange={v => {
        console.log(v)
        setKeyValues(v)
      }}
    />
  )
}

Template.args = {
  addButton: {
    maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
    name: 'Add key-value',
    tooltip: 'This is a tooltip',
  },
  inputKey: {
    label: 'Key',
    required: true,
  },
  inputValue: {
    label: 'Value',
    required: false,
  },
  name: 'keyValues',
  size: 'large',
  disabled: false,
  readOnly: false,
}

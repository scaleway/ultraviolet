import { Stack } from '@ultraviolet/ui'

import { KeyValueField } from '..'
import { Submit } from '../../Submit'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Regex: StoryFn<ComponentProps<typeof KeyValueField>> = args => (
  <Stack gap={1}>
    <KeyValueField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

const alpha = /^[a-zA-Z]*$/
const accessKeyRegex = /^SCW[A-Z0-9]{17}$/i

Regex.args = {
  addButton: {
    maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
    name: 'Add key-value',
    tooltip: 'This is a tooltip',
  },
  inputKey: {
    label: 'key',
    regex: [[alpha]],
    required: true,
  },
  inputValue: {
    label: 'value',
    regex: [accessKeyRegex],
    required: false,
  },
  name: 'regex',
}

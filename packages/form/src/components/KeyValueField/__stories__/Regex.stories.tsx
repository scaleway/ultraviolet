import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { KeyValueField } from '..'

export const Regex: StoryFn<ComponentProps<typeof KeyValueField>> = args => (
  <Stack gap={1}>
    <KeyValueField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

const alpha = /^[a-zA-Z]*$/
const accessKeyRegex = /^SCW[A-Z0-9]{17}$/i

Regex.args = {
  name: 'regex',
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
  addButton: {
    name: 'Add key-value',
    tooltip: 'This is a tooltip',
    maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
  },
}

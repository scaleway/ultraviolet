import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { KeyValueField } from '..'
import { Submit } from '../../Submit'

export const Required: StoryFn<ComponentProps<typeof KeyValueField>> = args => (
  <Stack gap={1}>
    <KeyValueField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)
Required.args = {
  addButton: {
    maxSizeReachedTooltip: 'This is a tooltip when the max size is reached',
    name: 'Add key-value',
    tooltip: 'This is a tooltip',
  },
  inputKey: {
    label: 'key',
  },
  inputValue: {
    label: 'value',
  },
  name: 'keyvalue',
  required: true,
}

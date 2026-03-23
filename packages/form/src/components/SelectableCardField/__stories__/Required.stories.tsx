import { Stack } from '@ultraviolet/ui'

import { SelectableCardField } from '..'
import { Submit } from '../../Submit'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Required: StoryFn<
  ComponentProps<typeof SelectableCardField>
> = args => (
  <Stack gap={1}>
    <SelectableCardField {...args} value="option 1" />
    <SelectableCardField {...args} value="option 2" />
    <Submit>Submit</Submit>
  </Stack>
)
Required.args = {
  name: 'required',
  required: true,
  showTick: true,
  value: 'required',
}

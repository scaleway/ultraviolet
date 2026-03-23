import { Stack } from '@ultraviolet/ui'

import { DateInputField } from '..'
import { Submit } from '../../Submit'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Clearable: StoryFn<
  ComponentProps<typeof DateInputField>
> = args => (
  <Stack gap={1}>
    <DateInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Clearable.args = {
  clearable: true,
  name: 'date',
  required: true,
}

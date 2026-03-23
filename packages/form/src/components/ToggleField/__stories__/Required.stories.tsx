import { Stack } from '@ultraviolet/ui'

import { ToggleField } from '..'
import { Submit } from '../../Submit'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Required: StoryFn<ComponentProps<typeof ToggleField>> = args => (
  <Stack gap={1}>
    <ToggleField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Required.args = {
  name: 'value',
  required: true,
}

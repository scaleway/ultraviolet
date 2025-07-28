import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../../Submit'
import { ToggleField } from '..'

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

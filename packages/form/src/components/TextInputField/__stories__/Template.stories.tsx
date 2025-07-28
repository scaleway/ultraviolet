import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Submit } from '../..'
import { TextInputField } from '..'

export const Template: StoryFn<
  ComponentProps<typeof TextInputField>
> = args => (
  <Stack gap="1">
    <TextInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Template.args = {
  label: 'Label',
  name: 'example',
  role: 'status',
  'aria-live': 'polite',
  'aria-atomic': 'true',
}

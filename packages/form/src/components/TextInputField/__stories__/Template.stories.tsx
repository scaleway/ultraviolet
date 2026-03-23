import { Stack } from '@ultraviolet/ui'

import { TextInputField } from '..'
import { Submit } from '../..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<
  ComponentProps<typeof TextInputField>
> = args => (
  <Stack gap="1">
    <TextInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Template.args = {
  'aria-atomic': 'true',
  'aria-live': 'polite',
  label: 'Label',
  name: 'example',
  role: 'status',
}

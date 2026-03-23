import { Stack } from '@ultraviolet/ui'

import { TimeInputField } from '..'
import { Submit } from '../..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<
  ComponentProps<typeof TimeInputField>
> = args => (
  <Stack gap="1">
    <TimeInputField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Template.args = {
  label: 'Label',
  name: 'example',
}

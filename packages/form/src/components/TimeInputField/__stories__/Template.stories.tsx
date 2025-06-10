import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { TimeInputField } from '..'
import { Submit } from '../..'

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

import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { TimeInputFieldV2 } from '..'
import { Submit } from '../..'

export const Template: StoryFn<
  ComponentProps<typeof TimeInputFieldV2>
> = args => (
  <Stack gap="1">
    <TimeInputFieldV2 {...args} />
    <Submit>Submit</Submit>
  </Stack>
)

Template.args = {
  label: 'Label',
  name: 'example',
}

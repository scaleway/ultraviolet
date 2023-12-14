import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TimeField } from '..'

export const Template: StoryFn<ComponentProps<typeof TimeField>> = args => (
  <TimeField {...args} />
)

Template.args = {
  name: 'time',
}

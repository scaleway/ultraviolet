import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateField } from '..'

export const Template: StoryFn<ComponentProps<typeof DateField>> = args => (
  <DateField {...args} />
)

Template.args = {
  name: 'date',
}

import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateInputField } from '..'

export const Template: StoryFn<
  ComponentProps<typeof DateInputField>
> = args => <DateInputField {...args} />

Template.args = {
  name: 'date',
}

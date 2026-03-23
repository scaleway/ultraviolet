import { DateInputField } from '..'

import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

export const Template: StoryFn<
  ComponentProps<typeof DateInputField>
> = args => <DateInputField {...args} />

Template.args = {
  name: 'date',
}

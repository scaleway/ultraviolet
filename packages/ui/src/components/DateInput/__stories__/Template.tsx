import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateInput } from '..'

export const Template: StoryFn<ComponentProps<typeof DateInput>> = props => (
  <DateInput {...props} required />
)

Template.args = {
  label: 'Date Input',
  required: true,
}

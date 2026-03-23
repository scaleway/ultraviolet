import { DateInput } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof DateInput> = props => (
  <DateInput {...props} />
)

Template.args = {
  label: 'Date Input',
  placeholder: 'MM-DD-YYYY',
  required: true,
}

import type { StoryFn } from '@storybook/react-vite'
import { DateInput } from '..'

export const Template: StoryFn<typeof DateInput> = props => (
  <DateInput {...props} />
)

Template.args = {
  label: 'Date Input',
  required: true,
  placeholder: 'MM-DD-YYYY',
}

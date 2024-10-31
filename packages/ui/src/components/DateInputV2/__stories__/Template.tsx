import type { StoryFn } from '@storybook/react'
import { DateInputV2 } from '..'

export const Template: StoryFn<typeof DateInputV2> = props => (
  <DateInputV2 {...props} />
)

Template.args = {
  label: 'Date Input',
  required: true,
  placeholder: 'YYYY-MM-DD',
}

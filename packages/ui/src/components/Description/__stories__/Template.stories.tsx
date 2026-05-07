import { Description } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Description> = props => (
  <Description {...props} />
)

Template.args = {
  helper: 'This is helper text',
  success: false,
  error: false,
  disabled: false,
  size: 'large',
}

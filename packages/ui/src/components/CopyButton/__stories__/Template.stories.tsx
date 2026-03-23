import { CopyButton } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof CopyButton> = props => (
  <CopyButton {...props} value="Text that will be copied" />
)

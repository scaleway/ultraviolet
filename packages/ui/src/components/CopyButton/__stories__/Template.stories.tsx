import type { StoryFn } from '@storybook/react'
import { CopyButton } from '..'

export const Template: StoryFn<typeof CopyButton> = props => (
  <CopyButton {...props} value="Text that will be copied" />
)

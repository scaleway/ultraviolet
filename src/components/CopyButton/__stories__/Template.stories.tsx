import { ComponentStory } from '@storybook/react'
import CopyButton from '..'

export const Template: ComponentStory<typeof CopyButton> = props => (
  <CopyButton {...props} value="Text that will be copied" />
)

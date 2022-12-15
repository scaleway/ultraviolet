import type { ComponentStory } from '@storybook/react'
import Tooltip from '..'

export const Template: ComponentStory<typeof Tooltip> = args => (
  <Tooltip {...args}>Hover Me</Tooltip>
)

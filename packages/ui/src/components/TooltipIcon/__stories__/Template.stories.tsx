import type { ComponentStory } from '@storybook/react'
import { TooltipIcon } from '..'

export const Template: ComponentStory<typeof TooltipIcon> = args => (
  <TooltipIcon {...args} />
)

Template.args = {
  tooltip: 'Hello there!',
}

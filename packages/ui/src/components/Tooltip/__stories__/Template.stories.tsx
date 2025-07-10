import type { StoryFn } from '@storybook/react-vite'
import { Tooltip } from '..'

export const Template: StoryFn<typeof Tooltip> = args => (
  <Tooltip {...args}>Hover Me</Tooltip>
)

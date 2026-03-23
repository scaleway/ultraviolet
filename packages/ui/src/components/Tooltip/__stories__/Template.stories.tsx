import { Tooltip } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Tooltip> = args => (
  <Tooltip {...args}>Hover Me</Tooltip>
)

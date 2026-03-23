import { Chip } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Chip> = ({ ...args }) => (
  <Chip {...args}>Default text</Chip>
)

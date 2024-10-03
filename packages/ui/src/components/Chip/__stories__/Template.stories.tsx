import type { StoryFn } from '@storybook/react'
import { Chip } from '..'

export const Template: StoryFn<typeof Chip> = ({ ...args }) => (
  <Chip {...args}>Default text</Chip>
)

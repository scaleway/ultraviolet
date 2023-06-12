import type { StoryFn } from '@storybook/react'
import { Separator } from '..'

export const Template: StoryFn<typeof Separator> = args => (
  <Separator {...args} />
)

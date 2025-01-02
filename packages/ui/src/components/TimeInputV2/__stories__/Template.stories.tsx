import type { StoryFn } from '@storybook/react'
import { TimeInputV2 } from '..'

export const Template: StoryFn<typeof TimeInputV2> = args => (
  <TimeInputV2 {...args} />
)

import type { StoryFn } from '@storybook/react'
import { Toggle } from '..'

export const Template: StoryFn<typeof Toggle> = args => (
  <Toggle label="Option 1" {...args} />
)

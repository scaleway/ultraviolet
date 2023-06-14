import type { StoryFn } from '@storybook/react'
import { TimeInput } from '..'

export const Template: StoryFn<typeof TimeInput> = args => (
  <TimeInput {...args} />
)

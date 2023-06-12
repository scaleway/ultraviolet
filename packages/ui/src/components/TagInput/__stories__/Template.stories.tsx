import type { StoryFn } from '@storybook/react'
import { TagInput } from '..'

export const Template: StoryFn<typeof TagInput> = args => (
  <TagInput name="template" {...args} />
)

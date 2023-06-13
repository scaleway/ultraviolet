import type { StoryFn } from '@storybook/react'
import type { TagInputFieldProps } from '..'
import { TagInputField } from '..'

export const Template: StoryFn<TagInputFieldProps> = args => (
  <TagInputField {...args} />
)

import type { ComponentStory } from '@storybook/react'
import { TagInput } from '..'

export const Template: ComponentStory<typeof TagInput> = args => (
  <TagInput name="template" {...args} />
)

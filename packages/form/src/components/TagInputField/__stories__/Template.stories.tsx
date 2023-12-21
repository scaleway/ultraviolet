import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { TagInputField } from '..'

export const Template: StoryFn<ComponentProps<typeof TagInputField>> = args => (
  <TagInputField {...args} />
)

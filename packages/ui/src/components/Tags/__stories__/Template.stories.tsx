import type { ComponentStory } from '@storybook/react'
import { Tags } from '..'

export const Template: ComponentStory<typeof Tags> = args => (
  <Tags name="template" {...args} />
)

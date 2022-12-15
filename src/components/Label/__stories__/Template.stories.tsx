import type { ComponentStory } from '@storybook/react'
import Label from '..'

export const Template: ComponentStory<typeof Label> = args => (
  <Label {...args}>This is a label</Label>
)

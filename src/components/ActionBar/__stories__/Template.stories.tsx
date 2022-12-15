import type { ComponentStory } from '@storybook/react'
import ActionBar from '..'

export const Template: ComponentStory<typeof ActionBar> = args => (
  <ActionBar {...args}>I am the Playground Action Bar</ActionBar>
)

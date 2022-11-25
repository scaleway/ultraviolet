import { ComponentStory } from '@storybook/react'
import ProgressBar from '..'

export const Template: ComponentStory<typeof ProgressBar> = args => (
  <ProgressBar value={40} {...args} />
)

import type { ComponentStory } from '@storybook/react'
import { Toggle } from '..'

export const Template: ComponentStory<typeof Toggle> = args => (
  <Toggle label="Option 1" {...args} />
)

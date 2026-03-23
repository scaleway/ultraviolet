import { Toggle } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof Toggle> = args => (
  <Toggle label="Option 1" {...args} />
)

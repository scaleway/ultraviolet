import { GlobalAlert } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof GlobalAlert> = args => (
  <GlobalAlert {...args} />
)

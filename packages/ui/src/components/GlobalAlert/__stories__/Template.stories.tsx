import type { StoryFn } from '@storybook/react-vite'
import { GlobalAlert } from '..'

export const Template: StoryFn<typeof GlobalAlert> = args => (
  <GlobalAlert {...args} />
)

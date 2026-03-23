import { TimeInput } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof TimeInput> = args => (
  <TimeInput {...args} />
)

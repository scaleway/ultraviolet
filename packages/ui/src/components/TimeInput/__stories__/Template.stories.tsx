import type { StoryFn } from '@storybook/react-vite'
import { TimeInput } from '..'

export const Template: StoryFn<typeof TimeInput> = args => (
  <TimeInput {...args} />
)

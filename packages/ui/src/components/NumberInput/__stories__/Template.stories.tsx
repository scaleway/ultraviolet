import { NumberInput } from '..'

import type { StoryFn } from '@storybook/react-vite'

export const Template: StoryFn<typeof NumberInput> = props => (
  <NumberInput {...props} />
)

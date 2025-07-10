import type { StoryFn } from '@storybook/react-vite'
import { NumberInput } from '..'

export const Template: StoryFn<typeof NumberInput> = props => (
  <NumberInput {...props} />
)

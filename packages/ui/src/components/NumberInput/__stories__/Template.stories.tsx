import type { StoryFn } from '@storybook/react'
import { NumberInput } from '..'

export const Template: StoryFn<typeof NumberInput> = props => (
  <NumberInput {...props} />
)

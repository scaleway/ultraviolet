import type { ComponentStory } from '@storybook/react'
import { NumberInput } from '..'

export const Template: ComponentStory<typeof NumberInput> = props => (
  <NumberInput {...props} />
)

import type { ComponentStory } from '@storybook/react'
import { Stepper } from '..'

export const Template: ComponentStory<typeof Stepper> = args => (
  <Stepper {...args} />
)

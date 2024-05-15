import type { StoryFn } from '@storybook/react'
import { Stepper } from '..'

export const Template: StoryFn<typeof Stepper> = args => (
  <Stepper {...args}>
    <Stepper.Step index={0}>
      <span>Initialize</span>
    </Stepper.Step>
    <Stepper.Step index={1}>
      <span>Create</span>
    </Stepper.Step>
    <Stepper.Step index={2}>
      <span>Done</span>
    </Stepper.Step>
  </Stepper>
)

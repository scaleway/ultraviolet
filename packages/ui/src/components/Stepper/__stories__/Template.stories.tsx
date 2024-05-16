import type { StoryFn } from '@storybook/react'
import { Stepper } from '..'

export const Template: StoryFn<typeof Stepper> = args => <Stepper {...args} />

Template.args = {
  children: [
    <Stepper.Step index={1} title="Initialize" />,
    <Stepper.Step index={2} title="Create" />,
    <Stepper.Step index={3} title="Done" />,
  ],
}

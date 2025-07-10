import type { StoryFn } from '@storybook/react-vite'
import { Stepper } from '..'

export const Template: StoryFn<typeof Stepper> = args => <Stepper {...args} />

Template.args = {
  children: [
    <Stepper.Step title="Initialize" />,
    <Stepper.Step title="Create" />,
    <Stepper.Step title="Done" />,
  ],
}

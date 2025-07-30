import type { StoryFn } from '@storybook/react-vite'
import { Stepper } from '..'

export const Template: StoryFn<typeof Stepper> = args => <Stepper {...args} />

Template.args = {
  children: [
    <Stepper.Step key="initialize" title="Initialize" />,
    <Stepper.Step key="create" title="Create" />,
    <Stepper.Step key="done" title="Done" />,
  ],
}

import type { StoryFn } from '@storybook/react-vite'
import { Stepper } from '..'

export const LongName: StoryFn<typeof Stepper> = args => (
  <Stepper {...args}>
    <Stepper.Step title="Custom title" />
    <Stepper.Step title="Example of a very long title that to showcase how it looks" />
    <Stepper.Step title="Continue" />
    <Stepper.Step title="Last step" />
    <Stepper.Step title="Done" />
  </Stepper>
)

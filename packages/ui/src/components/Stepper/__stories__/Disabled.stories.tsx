import { Stepper } from '..'
import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  children: [
    <Stepper.Step title="Step 1" />,
    <Stepper.Step disabled title="Step 2" />,
    <Stepper.Step title="Step 3" />,
    <Stepper.Step disabled title="Step 4" />,
    <Stepper.Step title="Step 5" />,
  ],
  interactive: true,
  selected: 2,
}

Disabled.parameters = {
  docs: {
    description: {
      story:
        'You can pass prop "disabled" to every step to disable them. Disabled states will not be accessible by the user if the stepper is interactive.',
    },
  },
}

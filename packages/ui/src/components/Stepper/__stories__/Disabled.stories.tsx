import { Stepper } from '..'
import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  children: [
    <Stepper.Step index={1} title="Step 1" />,
    <Stepper.Step index={2} disabled title="Step 2" />,
    <Stepper.Step index={3} title="Step 3" />,
    <Stepper.Step index={4} disabled title="Step 4" />,
    <Stepper.Step index={5} title="Step 5" />,
  ],
  selected: 1,
  interactive: true,
}

Disabled.parameters = {
  docs: {
    description: {
      story:
        'You can pass prop "disabled" to every step to disable them. Disabled states will not be accessible by the user if the stepper is interactive.',
    },
  },
}

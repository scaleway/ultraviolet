import { Stepper } from '..'
import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  children: [
    <Stepper.Step key="step-1" title="Step 1" />,
    <Stepper.Step disabled key="step-2" title="Step 2" />,
    <Stepper.Step key="step-3" title="Step 3" />,
    <Stepper.Step disabled key="step-4" title="Step 4" />,
    <Stepper.Step key="step-5" title="Step 5" />,
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

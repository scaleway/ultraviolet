import { Stepper } from '..'
import { Template } from './Template.stories'

export const Interactive = Template.bind({})

Interactive.args = {
  ...Template.args,
  children: [
    <Stepper.Step key="step-1" title="Step 1" />,
    <Stepper.Step key="step-2" title="Step 2" />,
    <Stepper.Step key="step-3" title="Step 3" />,
    <Stepper.Step key="step-4" title="Step 4" />,
    <Stepper.Step key="step-5" title="Step 5" />,
  ],
  interactive: true,
  selected: 3,
}
Interactive.parameters = {
  docs: {
    description: {
      story:
        'When interactive, it is possible to navigate through the previously completed steps freely. It is not possible to skip steps.',
    },
  },
}
